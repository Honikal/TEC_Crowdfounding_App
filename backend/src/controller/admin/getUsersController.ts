import { Request, Response } from 'express';
import UsuarioEntidad from '../../entities/usersDBConnection'; // Asegúrate de que esta ruta sea correcta

export const getUsersController = async (req: Request, res: Response): Promise<void> => {
    try {
        // Verificamos que la solicitud sea un GET
        if (req.method !== 'GET') {
            console.log('Método inválido:', req.method);
            res.status(405).send('Solo métodos GET son permitidos');
            return;
        }

        const usuarioEntidad = new UsuarioEntidad();

        // Si se proporciona un ID de usuario, obtenemos ese usuario
        if (req.query.id) {
            const id = req.query.id as string;
            const usuario = await usuarioEntidad.getUserByID(id);
            if (!usuario) {
                res.status(404).send('Usuario no encontrado');
                return;
            }
            res.status(200).json(usuario);
            return;
        }

        // Si se proporciona un correo, obtenemos el usuario por correo
        if (req.query.email) {
            const email = req.query.email as string;
            const usuario = await usuarioEntidad.getUserByEmail(email);
            if (!usuario) {
                res.status(404).send('Usuario no encontrado');
                return;
            }
            res.status(200).json(usuario);
            return;
        }

        // Si no se proporciona ningún parámetro, traemos todos los usuarios
        const usuarios = await usuarioEntidad.getUsers();

        if (!usuarios || usuarios.length === 0) {
            res.status(404).send('No hay usuarios disponibles');
            return;
        }

        // Enviamos los usuarios como respuesta
        res.status(200).json(usuarios);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error en getUsersController:', error.message);
            res.status(500).send(error.message || 'Internal Server Error');
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
};
