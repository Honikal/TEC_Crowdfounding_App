import { Request, Response } from 'express';
import axios from 'axios';

//Acá haremos acceso a todas las rutas que puede acceder la aplicación
import admin from '../../config/firebaseAdmin';
import UsuarioEntidad from '../../entities/usersDBConnection';

export const logoutController = async(req: Request, res: Response): Promise<void> => {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST'){
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }

        //Extraemos correo y contraseña
        const { email } = req.body;

        //Validamos inputs
        if (!email){
            res.status(400).send('Email requerido para hacer logout');
            return;
        }

        //Espacio de autenticación por Firebase y Token
        let userRecord;
        try {
            userRecord = await admin.auth().getUserByEmail(email);
            await admin.auth().revokeRefreshTokens(userRecord.uid); 
            //Quitamos los datos de chequeo de iniciar sesión
            res.status(200).send('Sesión cerrada con éxito y tokens revocados.');
        } catch (error: any){
            if (error.code === 'auth/user-not-found'){
                res.status(404).send('Usuario no encontrado en la base de datos');
                return;
            }
            throw error;
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error'); 
    }
};

