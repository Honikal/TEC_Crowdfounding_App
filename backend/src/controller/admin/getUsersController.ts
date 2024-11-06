import { Request, Response } from 'express';

//Acá haremos acceso a todas las rutas que puede acceder la aplicación
import UsuarioEntidad from '../../entities/usersDBConnection';

export const getUsersController = async(req: Request, res: Response): Promise<void> => {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'GET'){
            console.log('Invalid method:', req.method);  // Log incorrect method
            res.status(405).send('Solo métodos GET son permitidos');
            return;
        }

        //Creamos una instancia usuario del dato provisto
        const usuarioEntidad = new UsuarioEntidad();
        const usuarios = await usuarioEntidad.getUsers();

        //Respondemos con la lista de los proyectos
        console.log("Lista de usuarios dentro del sistema: ", usuarios);
        res.status(200).json(usuarios);
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error'); 
    }
}




