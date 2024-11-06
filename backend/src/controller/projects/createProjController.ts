import { Request, Response } from 'express';

//Acá haremos acceso a todas las rutas que puede acceder la aplicación
import admin from '../../config/firebaseAdmin';
import ProyectoEntidad from '../../entities/projectDBConnection';
import Proyecto from '../../models/projects';
import sendEmail from '../../entities/emailSender';
import Usuario from '../../models/users';

export const createProjectController = async(req: Request, res: Response): Promise<void> => {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST'){
            console.log('Invalid method:', req.method);  // Log incorrect method
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }

        //Extraemos los datos
        const { usuario, activa, name, description, category, reqBudget, actualBudget, startDate, limitDate, media } = req.body;

        //Validamos si las entradas son válidas
        if (!usuario ||
            !activa === undefined ||
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
            usuario.admin,
            usuario.activa
        )

        //Una vez validado ésto, creamos el proyecto en el sistema
        const proyectoEntidad = new ProyectoEntidad();
        const proyecto = new Proyecto('', usuarioInstance.getIdUsuario, activa, name, description, category, reqBudget, actualBudget, startDate, limitDate, media);
        proyectoEntidad.addProyecto(proyecto);
        //Una vez el usuario si ha sido registrado, enviaremos un correo electrónico
        await sendEmail(
            usuarioInstance.getCorreo,
            'Felicidades, has creado un proyecto',
            'Muchas gracias por crear un proyecto con nosotros, estaremos en contacto y observando tus progresos dentro del proyecto'
        );
        res.status(201).send('Proyecto creado exitosamente');
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error'); 
    }
}

