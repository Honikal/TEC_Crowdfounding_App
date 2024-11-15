import { Request, Response } from 'express';
import UsuarioEntidad from '../../entities/usersDBConnection';  // Asegúrate de que la ruta esté bien definida

// Controlador que obtiene todos los usuarios activos
export const getUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    // Verificamos que la solicitud sea un GET
    if (req.method !== 'GET') {
      console.log('Método inválido:', req.method);
      res.status(405).send('Solo métodos GET son permitidos');
      return;
    }

    // Instanciamos la entidad Usuario para obtener los usuarios
    const usuarioEntidad = new UsuarioEntidad();
    const usuarios = await usuarioEntidad.getUsers();

    // Respondemos con la lista de usuarios
    console.log("Lista de usuarios dentro del sistema: ", usuarios);
    res.status(200).json(usuarios);
  } catch (error: any) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).send(error.message || 'Internal Server Error');
  }
};

