import { Request, Response } from 'express';

//Acá haremos acceso a todas las rutas que puede acceder la aplicación
import UsuarioEntidad from '../../entities/usersDBConnection';
import ProyectoEntidad from '../../entities/projectDBConnection';
import DonacionEntidad from '../../entities/donationDBConnection';
import Donacion from '../../models/donation';

const convertirDateToString = (date: Date) => {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    return `${day}/${month}/${year}`;
}

export const getDonationsUserController = async(req: Request, res: Response): Promise<void> => {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'GET'){
            res.status(405).send('Solo métodos GET son permitidos');
            return;
        }

        //Extraemos la id del usuario
        const id_usuario = req.query.id_usuario as string;

        console.log(`Recibimos los datos: (Donador: ${id_usuario})`)

        //Validamos inputs
        if (!id_usuario){
            res.status(400).send('Error recibiendo los datos de acceso');
            return;
        }

        //Extraemos a los usuarios como tal encargados de fundar un proyecto
        const donacionEntidad = new DonacionEntidad();
        const listaDonaciones = await donacionEntidad.getProjectoByIDDonador(id_usuario);
        
        //Extraemos proyecto y usuario para extraer info
        const usuarioEntidad = new UsuarioEntidad();
        const proyectoEntidad = new ProyectoEntidad();

        const donacionesFinales: any[] = [];

        for (const donacion of listaDonaciones){
            const usuario_name =  (await usuarioEntidad.getUserByID(id_usuario))?.getNombre;
            const proyecto_name = (await proyectoEntidad.getProjectoByID(donacion.idProyecto))?.getNombre;

            donacionesFinales.push({
                ...donacion,
                nombre_donante: usuario_name,
                nombre_proyecto: proyecto_name
            })
        }

        console.log("Transformed donations:", donacionesFinales);  // Ensure this logs expected data
        //Respondemos con la lista de los proyectos
        res.status(200).json(donacionesFinales);
        
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error'); 
    }
};

