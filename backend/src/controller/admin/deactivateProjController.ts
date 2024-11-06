import { Request, Response } from 'express';

//Acá haremos acceso a todas las rutas que puede acceder la aplicación
import admin from '../../config/firebaseAdmin';
import ProyectoEntidad from '../../entities/projectDBConnection';
import sendEmail from '../../entities/emailSender';
import UsuarioEntidad from '../../entities/usersDBConnection';

const getDate = (): string => {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `Fecha: ${day}/${month}/${year} a las ${hours}:${minutes} hora de Costa Rica`;
}

export const deactivateProjController = async(req: Request, res: Response): Promise<void> => {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST'){
            console.log('Invalid method:', req.method);  // Log incorrect method
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }

        //Extraemos los datos
        const { idAdmin, idProyecto, idProyectoCreador, activa } = req.body;

        //Validamos si las entradas son válidas
        if (!idAdmin || !idProyecto || !idProyectoCreador || !activa === undefined){
            res.status(400).send('Todos los campos son requeridos');
            return;
        }

        //Creamos una instancia del usuario administrador y el usuario a recibir modificación del proyecto
        const usuarioEntidad = new UsuarioEntidad();
        const adminInstance = await usuarioEntidad.getUserByID(idAdmin);
        const usuarioInstance = await usuarioEntidad.getUserByID(idProyectoCreador);

        //Nos aseguramos de validar si los usuarios como tal fueron extraídos
        if (!usuarioInstance || !usuarioInstance.getCorreo){
            res.status(400).send('Usuario creador del proyecto no encontrado en la base de datos');
            return;
        }

        //Una vez validado ésto, procederemos con el cambio del proyecto
        const proyectoEntidad = new ProyectoEntidad();
        await proyectoEntidad.editProyecto(idProyecto, 
            {
                activa: activa,
            }
        )   

        const emailBody = `
        Un usuario administrador ha entrado a revisar tu proyecto y ha ejercido cambios de acceso al proyecto en la ${getDate()}.
        
Si encuentras que éste proyecto no está activo o a la vista del público y quieres saber la razón, por favor contacta a soporte, te atenderemos rápidamente.
        
En el peor de los casos, comunicarse con: ${adminInstance?.getCorreo}
`;

        //Una vez el usuario si ha sido registrado, enviaremos un correo electrónico
        await sendEmail(
            usuarioInstance.getCorreo,
            'Se ha modificado el estado de tu proyecto',
            emailBody.trim()
        );
        res.status(201).send('Proyecto modificado exitosamente');
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error'); 
    }
}

