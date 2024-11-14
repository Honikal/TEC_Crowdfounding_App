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

function calculateDaysRemaining(fecha: string): number {
    const fechaDate = parseDateString(fecha);
    const hoy = new Date();
    return Math.ceil((fechaDate.getTime() - hoy.getTime()) / (1000 * 3600 * 24));
}

function calculateFundingPercentage(fondosRecaudados: number, objetivoFinanciero: number): string {
    return ((fondosRecaudados / objetivoFinanciero) * 100).toFixed(2) + '%';
}

export const getProjectsCategoryController = async(req: Request, res: Response): Promise<void> => {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'GET'){
            res.status(405).send('Solo métodos GET son permitidos');
            return;
        }

        //Extraemos los datos
        const category = req.query.category as string;

        //Validamos si las entradas son válidas
        if (!category){
            res.status(400).send('Todos los campos son requeridos');
            return;
        }

        //Tomamos todos los proyectos
        const proyectoEntidad = new ProyectoEntidad();
        const usuarioEntidad = new UsuarioEntidad();
        const allProyectos = await proyectoEntidad.getProjectoByCategory(category) || [];

        const proyectosTransformados: any[] = [];

        for (const proyecto of allProyectos){
            //Obtención del nombre del creador
            const usuario = await usuarioEntidad.getUserByID(proyecto.id_creador);
            const nombreCreador = usuario ? usuario.getNombre : 'Desconocido';

            //Calcular días restantes
            //const fechaCreacion = parseDateString(proyecto.getFechaCreacion);
            const fechaLimite = parseDateString(proyecto.fecha_limite);
            const hoy = new Date();
            const diasRestantes = Math.ceil((fechaLimite.getTime() - hoy.getTime()) / (1000 * 3600 * 24));

            //Calcular porcentaje de fondos
            const porcentajeFundado = ((proyecto.fondos_recaudados / proyecto.objetivo_financiero) * 100).toFixed(2) + '%';

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
                nombre_creador: nombreCreador,
                diasRestantes: calculateDaysRemaining(proyecto.fecha_limite),
                porcentajeFundado: calculateFundingPercentage(proyecto.fondos_recaudados, proyecto.objetivo_financiero)
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

