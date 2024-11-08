import { Request, Response } from 'express';

//Acá haremos acceso a todas las rutas que puede acceder la aplicación
import admin from '../../config/firebaseAdmin';
import UsuarioEntidad from '../../entities/usersDBConnection';
import Usuario from '../../models/users';
import { UserRole } from '../../models/users'
import sendEmail from '../../entities/emailSender';

export const signupController = async(req: Request, res: Response): Promise<void> => {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST'){
            console.log('Invalid method:', req.method);  // Log incorrect method
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }

        //Extraemos los datos
        const { name, id, email, work_area, telephone, budget, password, confirmPassword, categories } = req.body;

        //Validamos si las entradas son válidas
        if (!name || !id || !email || !work_area || !categories || !telephone || !budget || !password || !confirmPassword){
            res.status(400).send('Todos los campos son requeridos');
            return;
        }

        //Validamos que la contraseña ingresada sea igual a la del confirm password
        if (password !== confirmPassword) {
            res.status(400).send('Las contraseñas ingresadas no coinciden');
            return;
        }

        //Validamos que el usuario ya esté registrado en la cuenta (solo un correo por usuario)
        //Corrección, no checamos dentro de la base de datos, checaremos con el sistema de autenticación

        //Paso 1: Creamos los usuarios en Autenticación de Firebase
        try {
            const userRecord = await admin.auth().createUser({
                email,
                password,
                displayName: name,
            });

            //Paso 2: Si no existe error de usuario ya existente, guardamos el usuario en la base de datos
            //Crear un nuevo usuario en la base de datos
            const usuarioEntidad = new UsuarioEntidad();
            const usuario = new Usuario('', name, id, work_area, budget, telephone, email, password, true, categories);
            usuarioEntidad.addUsuario(usuario);

            //Una vez el usuario si ha sido registrado, enviaremos un correo electrónico
            await sendEmail(
                usuario.getCorreo,
                `Bienvenido a Crowdfounder ${usuario.getNombre}`,
                'Bienvenido a Crowdfounder, aplicación del TEC donde podrás crear y producir tus futuros proyectos. Muchas gracias por unirte'
            );

            //Enviamos el usuario al sistema
            const user = usuarioEntidad.createUsuarioFromData(await usuarioEntidad.getUserByEmail(email));
            res.status(200).json(user.toJson());
        } catch (authError: any) {
            if (authError.code === 'auth/email-already-exists'){
                res.status(409).send('El usuario ya está registrado');
            } else {
                throw authError;
            }
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error'); 
    }
}

