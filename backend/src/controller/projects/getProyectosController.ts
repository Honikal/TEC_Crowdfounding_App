import { Request, Response } from 'express';

//Acá haremos acceso a todas las rutas que puede acceder la aplicación
import admin from '../../config/firebaseAdmin';
import ProyectoEntidad from '../../entities/projectDBConnection';
import UsuarioEntidad from '../../entities/usersDBConnection';

function parseDateString(dateStr: String): Date {
    const parts = dateStr.split('/');
    if (parts.length === 3){
        return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
    }
    throw new Error('Dato inválido de fecha');
}

export const getProjectController = async(req: Request, res: Response): Promise<void> => {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'GET'){
            console.log('Invalid method:', req.method);  // Log incorrect method
            res.status(405).send('Solo métodos GET son permitidos');
            return;
        }

        //Tomamos todos los proyectos
        const proyectoEntidad = new ProyectoEntidad();
        const usuarioEntidad = new UsuarioEntidad();
        const allProyectos = await proyectoEntidad.getProjectos() || [];

        /*
        const proyectosTransformados = await allProyectos.map(async (proyecto) => {
            const jsonPr = proyecto.toJson();
            console.log("Processing project:", jsonPr.idProyecto); 


            

            //Calcular días restantes
            //const fechaCreacion = parseDateString(proyecto.getFechaCreacion);
            const fechaLimite = parseDateString(jsonPr.fecha_limite);
            console.log("Fecha límite modificada: ", fechaLimite);

            const hoy = new Date();
            const diasRestantes = Math.ceil((fechaLimite.getTime() - hoy.getTime()) / (1000 * 3600 * 24));
            console.log("Dias restantes calculados: ", diasRestantes);


            //Calcular porcentaje de fondos
            const porcentajeFundado = ((jsonPr.fondos_recaudados / jsonPr.objetivo_financiero) * 100).toFixed(2) + '%';

            return {
                activa: jsonPr.activa,
                nombre: jsonPr.nombre,
                categorias: jsonPr.categorias,
                descripcion: jsonPr.descripcion,
                idProyecto: jsonPr.idProyecto,
                id_creador: jsonPr.id_creador,
                media: jsonPr.media,
                nombre_creador: nombreCreador,
                diasRestantes: diasRestantes,
                porcentajeFundado: porcentajeFundado,
            }
        }); 
        */

        const proyectosTransformados: any[] = [];

        for (const proyecto of allProyectos){
            //Obtención del nombre del creador
            const usuario = await usuarioEntidad.getUserByID(proyecto.id_creador);
            const nombreCreador = usuario ? usuario.getNombre : 'Desconocido';

            //Corrección de links
            const mediaUrls: string[] = []
            for (const fileUrl of proyecto.media){
                if (fileUrl.startsWith('gs://')){
                    const bucket = admin.storage().bucket();
                    const file = bucket.file(fileUrl.replace(/gs:\/\/[^\/]+\//, ''));
                    const [url] = await file.getSignedUrl({
                        action: 'read',
                        expires: '03-09-2491'
                    });
                    mediaUrls.push(url)
                } else {
                    mediaUrls.push(fileUrl);
                }
            }

            proyectosTransformados.push({
                ...proyecto,
                media: mediaUrls,
                nombre_creador: nombreCreador
            })
        }

        console.log("Transformed projects:", proyectosTransformados);  // Ensure this logs expected data
        //Respondemos con la lista de los proyectos
        res.status(200).json(proyectosTransformados);
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error'); 
    }
}

