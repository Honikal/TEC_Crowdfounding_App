import { Request, Response } from 'express';

//Acá haremos acceso a todas las rutas que puede acceder la aplicación
import UsuarioEntidad from '../../entities/usersDBConnection';
import ProyectoEntidad from '../../entities/projectDBConnection';
import DonacionEntidad from '../../entities/donationDBConnection';

export const getDonationsController = async(req: Request, res: Response): Promise<void> => {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'GET'){
            res.status(405).send('Solo métodos GET son permitidos');
            return;
        }

        //Extraemos a los usuarios como tal encargados de fundar un proyecto
        const donacionEntidad = new DonacionEntidad();
        const listaDonaciones = await donacionEntidad.getDonations();
        
        //Extraemos proyecto y usuario para extraer info
        const usuarioEntidad = new UsuarioEntidad();
        const proyectoEntidad = new ProyectoEntidad();

        const donacionesFinales: any[] = [];

        for (const donacion of listaDonaciones){
            const usuario_name =  (await usuarioEntidad.getUserByID(donacion.idDonante))?.getNombre;
            const proyecto_name = (await proyectoEntidad.getProjectoByID(donacion.idProyecto))?.getNombre;

            donacionesFinales.push({
                ...donacion,
                nombre_donante: usuario_name,
                nombre_proyecto: proyecto_name
            })
        }

        console.log("Transformed donations:", donacionesFinales);  // Ensure this logs expected data
        //Respondemos con la lista de los proyectos
        res.status(200).json(donacionesFinales);
        
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error'); 
    }
};

