import { Request, Response } from 'express';

//Acá haremos acceso a todas las rutas que puede acceder la aplicación
import admin from '../../config/firebaseAdmin';
import UsuarioEntidad from '../../entities/usersDBConnection';
import sendEmail from '../../entities/emailSender';

export const ChngPasswordController = async(req: Request, res: Response): Promise<void> => {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST'){
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }

        //Extraemos correo y contraseña
        const { email, password, confirmPassword } = req.body;

        //Validamos inputs
        if (!email || !password || !confirmPassword ){
            res.status(400).send('Email institucional y contraseñas requeridos');
            return;
        }

        //Validamos que la contraseña ingresada sea igual a la del confirm password
        if (password !== confirmPassword) {
            res.status(400).send('Las contraseñas ingresadas no coinciden');
            return;
        }

        //Autenticación por firebase
        try {
            //Checamos existencia del posible usuario
            await admin.auth().getUserByEmail(email);

            //Obtenemos el link de solicitud de modificación de contraseña
            const resetLink = await admin.auth().generatePasswordResetLink(email);
            
            //Enviaremos entonces un correo electrónico para ejercer cambio de contraseña
            await sendEmail(
                email,
                'Resetear contraseña de ingreso',
                `Por favor, da click a éste link para resetear tu contraseña de acceso a la aplicación. ${resetLink}`
            )

            res.status(200).send('Correo de modificación de contraseña enviado de forma efectiva');

            const usuarioEntidad = new UsuarioEntidad();
            const usuario = usuarioEntidad.createUsuarioFromData(await usuarioEntidad.getUserByEmail(email));
            await usuarioEntidad.editUsuario(usuario.getIdUsuario, 
                {
                    password: password
                }
            )
        } catch (authError: any) {
            if (authError.code === 'auth/user-not-found'){
                res.status(404).send('El usuario no se encuentra registrado');
            } else {
                console.error('Error enviando correo para resetear contraseña: ', authError.message);
                res.status(500).send('Error interno cambiando contraseña');
            }
        }

        
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error'); 
    }
};

