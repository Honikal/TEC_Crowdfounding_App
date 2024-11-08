import { Request, Response } from 'express';

//Acá haremos acceso a todas las rutas que puede acceder la aplicación
import admin from '../../config/firebaseAdmin';
import ProyectoEntidad from '../../entities/projectDBConnection';
import Proyecto from '../../models/projects';
import Usuario from '../../models/users';
import UsuarioEntidad from '../../entities/usersDBConnection';


export const filterProjController = async(req: Request, res: Response): Promise<void> => {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST'){
            console.log('Invalid method:', req.method);  // Log incorrect method
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }

        //Extraemos los datos
        const { idUsuario } = req.body;

        //Validamos si las entradas son válidas
        if (!idUsuario){
            res.status(400).send('El id del usuario es requerido');
            return;
        }

        //Creamos una instancia usuario del dato provisto
        const usuarioEntidad = new UsuarioEntidad();
        const usuarioInstancia = await usuarioEntidad.getUserByID(idUsuario);

        if (!usuarioInstancia){
            res.status(404).send('Usuario no encontrado en la base de datos');
            return;
        }

        //Tomamos todos los proyectos
        const proyectoEntidad = new ProyectoEntidad();
        const allProyectos = await proyectoEntidad.getProjectos();

        if (!allProyectos || allProyectos.length === 0){
            res.status(200).json([]); //No hay proyectos a filtrar
            return;
        }

        console.log("Proyectos a mostrar: ", allProyectos);

        //Filtramos los proyectos basados en las categorías preferidas del usuario
        const categoriasPreferidas: string[] = usuarioInstancia.getCategorias;
        console.log("Categorias seleccionadas: ", categoriasPreferidas);

        if (!categoriasPreferidas || categoriasPreferidas.length === 0){
            res.status(200).json(allProyectos);
            return;
        }

        const filteredProjects = allProyectos.filter((proyect: Proyecto) => 
            proyect.getCategoria.some(categoria =>
                categoriasPreferidas.includes(categoria.toLowerCase())
            )
        );

        // Log filtered projects for debugging
        filteredProjects.forEach((proyecto, index) => {
            console.log(`Proyecto ${index}: ${proyecto.getNombre}`);
        });

        //Respondemos con la lista de los proyectos
        res.status(200).json(filteredProjects);
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error'); 
    }
}

