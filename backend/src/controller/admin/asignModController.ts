import { Request, Response } from 'express';

//Acá haremos acceso a todas las rutas que puede acceder la aplicación
import admin from '../../config/firebaseAdmin';
import { UserRole } from '../../models/users';
import sendEmail from '../../entities/emailSender';
import UsuarioEntidad from '../../entities/usersDBConnection';

export const asignModController = async(req: Request, res: Response): Promise<void> => {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST'){
            console.log('Invalid method:', req.method);  // Log incorrect method
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }

        //Extraemos los datos
        const { idUsuario, activa } = req.body;

        //Validamos si las entradas son válidas
        if ( !idUsuario || !activa === undefined){
            res.status(400).send('Todos los campos son requeridos');
            return;
        }

        //Creamos una instancia del usuario administrador y el usuario a recibir modificación del proyecto
        const usuarioEntidad = new UsuarioEntidad();
        const usuarioInstance = await usuarioEntidad.getUserByID(idUsuario);

        //Nos aseguramos de validar si los usuarios como tal fueron extraídos
        if (!usuarioInstance || !usuarioInstance.getCorreo){
            res.status(400).send('Usuario a buscar no registrado dentro del proyecto');
            return;
        }

        //Checamos si el valor de activa es true or false, dependiendo del caso, asignaremos un rol distinto
        const rol = activa ? UserRole.MENTOR : UserRole.REGULAR;
        console.log('Rol asignado: ', rol);

        //Una vez validado ésto, procederemos con la modificación del estado de cuenta del usuario
        await usuarioEntidad.editUsuario(idUsuario, {
            rol: rol
        });

        const emailSubMentor = `Felicidades ${usuarioInstance.getNombre} has sido seleccionado para ser mentor`;
        const emailBodyMentor = `
        Has sido asignado por uno de los administradores como un usuario mentor por tus conocimientos.
        
Ésto te dará distintas oportunidades, como el ser elegido por distintos proyectos como posible mentor o consultor, y del cual podrás sacar ciertas ganancias
        
No olvides entonces de modificar tu usuario e insertar tu salario inicial deseado, y de nuevo, bienvenido al equipo.
`;
        const emailSubUnmentor = `Lamentamos que te vayas: ${usuarioInstance.getNombre}`;
        const emailBodyUnmentor = `
        Muchas gracias por haber participado en la aplicación como mentor, esperamos que hayas sacado bastante provecho como mentor.

De recibir éste correo fue porque previamente te comunicaste con uno de los administradores solicitando salir de acceso como administrador, o que cometiste una falta que obligó a sacarte.

Sin importar cual sea la razón, agradecemos tu participación en tu aplicación. 
`;

        //Una vez el usuario si ha sido registrado, enviaremos un correo electrónico
        if (activa){
            //Correo para bloquear el acceso a la cuenta
            await sendEmail(
                usuarioInstance.getCorreo,
                emailSubMentor,
                emailBodyMentor.trim()
            );
        } else {
            //Correo para mencionar que las circunstancias del error han sido solucionadas
            await sendEmail(
                usuarioInstance.getCorreo,
                emailSubUnmentor,
                emailBodyUnmentor.trim()
            );
        }

        res.status(201).send('Se ha modificado el rol del usuario de forma exitosa');
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error'); 
    }
}

