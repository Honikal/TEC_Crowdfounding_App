import { Request, Response } from 'express';

//Acá haremos acceso a todas las rutas que puede acceder la aplicación
import admin from '../config/firebaseAdmin';
import UsuarioEntidad from '../entities/usersDBConnection';

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


        //Inicializamos Usuario entidad y tomamos el usuario por correo
        const usuarioEntidad = new UsuarioEntidad(admin);
        const usuario = await usuarioEntidad.authenticateUser(email, password);

        //Checamos la existencia de un usuario
        if (!usuario){
            res.status(404).send('Usuario no encontrado en la base de datos');
            return;
        }

        //Respondemos con la información del usuario
        res.status(200).json(usuario);
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error'); 
    }
};

