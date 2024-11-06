import { Request, Response } from 'express';
import axios from 'axios';

//Acá haremos acceso a todas las rutas que puede acceder la aplicación
import admin from '../../config/firebaseAdmin';
import UsuarioEntidad from '../../entities/usersDBConnection';

export const loginController = async(req: Request, res: Response): Promise<void> => {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST'){
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }

        //Extraemos correo y contraseña
        const { email, password } = req.body;

        //Validamos inputs
        if (!email || !password){
            res.status(400).send('Email institucional y contraseña requeridos');
            return;
        }

        //Espacio de autenticación por Firebase y Token
        let userRecord;
        try {
            userRecord = await admin.auth().getUserByEmail(email);
        } catch (error: any){
            if (error.code === 'auth/user-not-found'){
                res.status(404).send('Usuario no encontrado en la base de datos');
                return;
            }
            throw error;
        }

        //Conectamos entidad completa con el sistema de autenticación de Firebase, llamando al REST API de éste
        try {
            //Si el valor de signInResponse retorna de forma correcta, el usuario inició sesión, podemos extraer el usuario
            const usuarioEntidad = new UsuarioEntidad();
            const usuario = await usuarioEntidad.getUserByEmail(email);

            //Checamos si el usuario es activo o no
            if (!usuario.activa){
                res.status(404).send('Se ha bloqueado el acceso a ésta cuenta, por favor comunicarse con soporte y atención para discutir la razón');
                return;
            }

            //Haremos login desde firebase
            const apiKey = process.env.API_KEY;
            const signInResponse = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
                { email, password, returnSecureToken: true }
            )
            
            res.status(200).json(usuario);
        } catch (authError: any) {
            if (authError.response && authError.response.data.error.message === 'INVALID_PASSWORD') {
                res.status(401).send('Contraseña incorrecta');
            } else if (authError.response && authError.response.data.error.message === 'EMAIL_NOT_FOUND') {
                res.status(404).send('Usuario no encontrado');
            } else {
                console.error('Error de autenticación en Firebase:', authError.response ? authError.response.data : authError.message);;
                res.status(500).send('Error en autenticación de usuario, ¿quizás olvidaste la contraseña?');
            }
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error'); 
    }
};

