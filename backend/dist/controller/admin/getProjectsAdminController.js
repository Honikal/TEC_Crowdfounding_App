import { Request, Response } from 'express';
import ProyectoEntidad from '../../entities/projectsDBConnection';

export const getProjectsController = async (req: Request, res: Response): Promise<void> => {
    try {
        // Verificamos que la solicitud sea un GET
        if (req.method !== 'GET') {
            console.log('Método inválido:', req.method);
            res.status(405).send('Solo métodos GET son permitidos');
            return;
        }

        // Si se proporciona un ID de proyecto, obtenemos ese proyecto
        if (req.query.id) {
            const id = req.query.id as string;
            const proyectoEntidad = new ProyectoEntidad();
            const proyecto = await proyectoEntidad.getProjectoByID(id);
            if (!proyecto) {
                res.status(404).send('Proyecto no encontrado');
                return;
            }
            res.status(200).json(proyecto);
        }
        // Si no se proporciona un ID, obtenemos todos los proyectos
        else {
            const proyectoEntidad = new ProyectoEntidad();
            const proyectos = await proyectoEntidad.getProjectos();
            if (!proyectos) {
                res.status(404).send('No hay proyectos disponibles');
                return;
            }
            res.status(200).json(proyectos);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error);
            res.status(500).send(error.message || 'Internal Server Error');
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
};
