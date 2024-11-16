import { Request, Response } from 'express';

//Acá haremos acceso a todas las rutas que puede acceder la aplicación
import UsuarioEntidad from '../../entities/usersDBConnection';
import ProyectoEntidad from '../../entities/projectDBConnection';
import sendEmail from '../../entities/emailSender';
import DonacionEntidad from '../../entities/donationDBConnection';
import Donacion from '../../models/donation';

const convertirDateToString = (date: Date) => {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    return `${day}/${month}/${year}`;
}

const getTime = (date: Date) => {
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();

    return `${h}:${m}:${s}`
}

export const donateController = async(req: Request, res: Response): Promise<void> => {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST'){
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }

        //Extraemos la id del proyecto y la del donador
        const { id_proyecto, id_donador, monto_donado } = req.body;

        console.log(`Recibimos los datos: (Proyecto: ${id_proyecto}) (Donador: ${id_donador}) (Monto: ${monto_donado})`)

        //Validamos inputs
        if (!id_proyecto || !id_donador || monto_donado === undefined || isNaN(monto_donado)){
            res.status(400).send('Error recibiendo los datos de acceso');
            return;
        }

        //Extraemos a los usuarios como tal encargados de fundar un proyecto
        const usuarioEntidad = new UsuarioEntidad();
        const proyectoEntidad = new ProyectoEntidad();

        const proyecto = await proyectoEntidad.getProjectoByID(id_proyecto);
        if (!proyecto){
            res.status(404).send('Error extrayendo el proyecto por el cual se hará la donación');
            return;
        }
        const creador_proyecto = await usuarioEntidad.getUserByID(proyecto?.getIdCreador);
        const donador = await usuarioEntidad.getUserByID(id_donador);

        if (!creador_proyecto){
            res.status(404).send('Error extrayendo el/los creadores del proyecto al cual se va a incorporar la donación');
            return;
        }

        if (!donador){
            res.status(404).send('Error extrayendo información del donante en éste caso');
            return;
        }

        //Primero, vamos a crear una donación como tal, con los siguientes datos
        const donacionEntidad = new DonacionEntidad();
        const idDonacion = await donacionEntidad.generateIDKey();
        if (!idDonacion){
            res.status(404).send('Error generando la id de donación');
            return;
        }

        const fecha_donacion = new Date();
        const donacion = new Donacion(idDonacion,
            id_proyecto,
            id_donador,
            convertirDateToString(fecha_donacion),
            getTime(fecha_donacion),
            monto_donado
        );

        //Aumentamos como tal el cantidad de fondos del proyecto con base al dinero recibido
        //Proyecto
        const fondos_actualizados = proyecto.getFondosRecaudados + monto_donado; 
        await proyectoEntidad.editProyecto(id_proyecto,
            {
                fondos_recaudados: fondos_actualizados
            }
        );
        //Usuario
        const presupuesto_actualizado = donador.getPresupuesto - monto_donado;
        await usuarioEntidad.editUsuario(id_donador,
            {
                presupuesto: presupuesto_actualizado
            }
        )

        //Luego entonces agregamos la donación
        donacionEntidad.addDonacion(donacion);

        //Enviamos ambos correos a distintos usuarios (donante y creador del proyecto)

        //Donante
        await sendEmail(
            donador?.getCorreo,
            "Muchas gracias por tu donación",
            `El proyecto ${proyecto.getNombre} agradece de forma indefinida tu donación, y espera fervientemente que estés al tanto de futuras entradas dentro de la aplicación.`
        )

        //Líder(es) del proyecto
        await sendEmail(
            creador_proyecto?.getCorreo,
            "Has recibido una donación",
            `Felicidades, su proyecto ha recibido una donación de $${donacion}, donados por el grandioso usuario ${donador?.getNombre}.
Sigan motivados a continuar fervosamente su proyecto`
        );

        res.status(200).json(idDonacion);
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error'); 
    }
};

