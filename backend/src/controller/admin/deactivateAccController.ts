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

export const deactivateAccController = async(req: Request, res: Response): Promise<void> => {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST'){
            console.log('Invalid method:', req.method);  // Log incorrect method
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }

        //Extraemos los datos
        const { idAdmin, idUsuario, estado } = req.body;

        //Validamos si las entradas son válidas
        if (!idAdmin || !idUsuario || !estado === undefined){
            res.status(400).send('Todos los campos son requeridos');
            return;
        }

        //Creamos una instancia del usuario administrador y el usuario a recibir modificación del proyecto
        const usuarioEntidad = new UsuarioEntidad();
        const adminInstance = await usuarioEntidad.getUserByID(idAdmin);
        const usuarioInstance = await usuarioEntidad.getUserByID(idUsuario);

        //Nos aseguramos de validar si los usuarios como tal fueron extraídos
        if (!usuarioInstance || !usuarioInstance.getCorreo){
            res.status(400).send('Usuario creador del proyecto no encontrado en la base de datos');
            return;
        }
        if (!adminInstance){
            res.status(400).send('Administrador no encontrado dentro del sistema');
            return;
        }

        console.log(`Datos recibidos: (Id usuario: ${idUsuario}) (Id Admin: ${idAdmin}) (Estado: ${estado})`)

        //Una vez validado ésto, procederemos con la modificación del estado de cuenta del usuario
        await usuarioEntidad.editUsuario(idUsuario, {
            activa: estado
        });


        const emailBodyBlock = `
        Un usuario administrador ha entrado a revisar tu cuenta y ha observado que has incumplido con algunos de varios reglamentos de la aplicación, por lo cual ha cerrado tu acceso a la cuenta en la ${getDate()}.
        
Si se trata de un malentendido o deseas consultar el cómo recuperar tu cuenta, por favor contacta con el servicio de soporte, te atenderemos rápidamente.
        
En el peor de los casos, comunicarse con el administrador en clave: ${adminInstance?.getCorreo}
`;

        const emailBodyUnlock = `
        Muchas gracias por la espera, se ha hecho una revisión más a fondo y se ha solucionado el posible inconveniente en tu cuenta.

Nos disculpamos por el dicho inconveniente causado, y le damos a informar que usted ya tiene acceso a la cuenta, siendo ésta modificación ejercida en la ${getDate()}.

Si desea averiguar más información de la situación o el inconveniente, por favor contactar con el servicio de soporte, o comunicarse con el administrador en clave: ${adminInstance?.getCorreo}.
`;

        //Una vez el usuario si ha sido registrado, enviaremos un correo electrónico
        if (estado === false){
            //Correo para bloquear el acceso a la cuenta
            await sendEmail(
                usuarioInstance.getCorreo,
                'Se le ha bloqueado el acceso a la aplicación',
                emailBodyBlock.trim()
            );
        } else {
            //Correo para mencionar que las circunstancias del error han sido solucionadas
            await sendEmail(
                usuarioInstance.getCorreo,
                'Disculpe la demora, desbloqueamos el acceso a la aplicación',
                emailBodyUnlock.trim()
            );
        }

        
        res.status(201).send('Estado de acceso de cuenta modificado exitosamente');
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error'); 
    }
}

