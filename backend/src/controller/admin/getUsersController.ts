import { Request, Response } from 'express';
import UsuarioEntidad from '../../entities/usersDBConnection'; // Asegúrate de que esta ruta sea correcta

export const getUsersController = async (req: Request, res: Response): Promise<void> => {
    try {
        // Verificamos que la solicitud sea un GET
        if (req.method !== 'GET') {
            console.log('Método inválido:', req.method);  // Log incorrect method
            res.status(405).send('Solo métodos GET son permitidos');
            return;
        }

        // Si se proporciona un ID de usuario, obtenemos ese usuario
        if (req.query.id) {
            const id = req.query.id as string;
            const usuarioEntidad = new UsuarioEntidad();
            const usuario = await usuarioEntidad.getUserByID(id);
            if (!usuario) {
                res.status(404).send('Usuario no encontrado');
                return;
            }
            res.status(200).json(usuario);
        }
        // Si se proporciona un correo, obtenemos el usuario por correo
        else if (req.query.email) {
            const email = req.query.email as string;
            const usuarioEntidad = new UsuarioEntidad();
            const usuario = await usuarioEntidad.getUserByEmail(email);
            if (!usuario) {
                res.status(404).send('Usuario no encontrado');
                return;
            }
            res.status(200).json(usuario);
        } else {
            // Si no se proporciona ningún parámetro, traemos todos los usuarios
            const usuarioEntidad = new UsuarioEntidad();
            const usuarios = await usuarioEntidad.getUsers();
            if (!usuarios) {
                res.status(404).send('No hay usuarios disponibles');
                return;
            }
            res.status(200).json(usuarios);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error);
          res.status(500).send(error.message || 'Internal Server Error');
        } else {
          // Si no es una instancia de Error, maneja el caso genérico
          res.status(500).send('Internal Server Error');
        }
      }
      
};



  