import { Request, Response } from 'express';

//Acá haremos acceso a todas las rutas que puede acceder la aplicación
import admin from '../../config/firebaseAdmin';
import ProyectoEntidad from '../../entities/projectDBConnection';
import Proyecto from '../../models/projects';
import sendEmail from '../../entities/emailSender';
import Usuario from '../../models/users';

const getDate = (): string => {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `Fecha: ${day}/${month}/${year} a las ${hours}:${minutes} hora de Costa Rica.`;
}

export const modProjectController = async(req: Request, res: Response): Promise<void> => {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST'){
            console.log('Invalid method:', req.method);  // Log incorrect method
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }

        //Extraemos los datos
        const { usuario, idProyecto, name, description, category, reqBudget, actualBudget, startDate, limitDate, media } = req.body;
        console.log(`Datos extraídos: ${usuario}, ${idProyecto}, ${name}, ${description}, ${category}, ${reqBudget}, ${actualBudget}, ${startDate}, ${limitDate}, ${media}`)

        //Validamos si las entradas son válidas
        if (!usuario || !idProyecto || 
            !name || !description || !category ||
            !reqBudget === undefined ||
            !actualBudget === undefined ||
            !startDate || !limitDate || !media){
            res.status(400).send('Todos los campos son requeridos');
            return;
        }

        //Creamos una instancia usuario del dato provisto
        const usuarioInstance = new Usuario(
            usuario.idUsuario,
            usuario.nombre,
            usuario.cedula,
            usuario.areaTrabajo,
            usuario.presupuesto,
            usuario.telefono,
            usuario.correo,
            usuario.password,
            usuario.activa,
            usuario.rol
        )

        //Una vez validado ésto, procederemos con el cambio del proyecto
        const proyectoEntidad = new ProyectoEntidad();
        await proyectoEntidad.editProyecto(idProyecto, 
            {
                nombre: name,
                categorias: category,
                descripcion: description,
                fecha_creacion: startDate,
                fecha_limite: limitDate,
                objetivo_financiero: reqBudget,
                fondos_recaudados: actualBudget,
                media: media
            }
        )

        //Una vez el usuario si ha sido registrado, enviaremos un correo electrónico
        await sendEmail(
            usuarioInstance.getCorreo,
            'Has efectuado cambios dentro de tu proyecto',
            `Se te hace informar que se han efectuado los cambios que has realizado dentro de tu proyecto. Se estima entonces que la modificación fue hecha en la ${getDate()}.`
        );
        res.status(201).send('Proyecto modificado exitosamente');
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error'); 
    }
}

