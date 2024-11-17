import { Request, Response } from 'express';
import axios from 'axios';
import admin from '../../config/firebaseAdmin';
import UsuarioEntidad from '../../entities/usersDBConnection';

export const loginController = async (req: Request, res: Response): Promise<void> => {
    try {
        // Verificación de método
        if (req.method !== 'POST') {
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }

        const { email, password } = req.body;

        // Validación de inputs
        if (!email || !password) {
            res.status(400).send('Email institucional y contraseña requeridos');
            return;
        }

        // Verificación del usuario en Firebase
        let userRecord;
        try {
            userRecord = await admin.auth().getUserByEmail(email);
        } catch (error: any) {
            if (error.code === 'auth/user-not-found') {
                res.status(404).send('Usuario no encontrado en la base de datos');
                return;
            }
            throw error;
        }

        try {
            const usuarioEntidad = new UsuarioEntidad();
            const usuario = await usuarioEntidad.getUserByEmail(email);

            // Verificación de si el usuario está activo
            if (!usuario.activa) {
                res.status(403).send('Se ha bloqueado el acceso a esta cuenta, por favor comuníquese con soporte');
                return;
            }

            // Autenticación con Firebase
            const apiKey = process.env.API_KEY;
            const signInResponse = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
                { email, password, returnSecureToken: true }
            );

            // Creación del objeto de respuesta incluyendo el rol
            const retornarUsuario = usuarioEntidad.createUsuarioFromData(usuario).toJson();
            retornarUsuario.role = usuario.rol;  // Agregamos el rol del usuario a la respuesta

            res.status(200).json(retornarUsuario);
        } catch (authError: any) {
            if (authError.response && authError.response.data.error.message === 'INVALID_PASSWORD') {
                res.status(401).send('Contraseña incorrecta');
            } else if (authError.response && authError.response.data.error.message === 'EMAIL_NOT_FOUND') {
                res.status(404).send('Usuario no encontrado');
            } else {
                console.error('Error de autenticación en Firebase:', authError.response ? authError.response.data : authError.message);
                res.status(500).send('Error en autenticación de usuario, ¿quizás olvidaste la contraseña?');
            }
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
};
