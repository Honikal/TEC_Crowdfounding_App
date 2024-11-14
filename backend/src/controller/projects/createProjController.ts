import { Request, Response } from 'express';

//Acá haremos acceso a todas las rutas que puede acceder la aplicación
import admin from '../../config/firebaseAdmin';
import ProyectoEntidad from '../../entities/projectDBConnection';
import Proyecto from '../../models/projects';
import sendEmail from '../../entities/emailSender';
import Usuario from '../../models/users';
import uploadMediaToFirebase from '../../entities/storageDBConnection';

export const createProjectController = async(req: Request, res: Response): Promise<void> => {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST'){
            console.log('Invalid method:', req.method);  // Log incorrect method
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }

        //Extraemos los datos
        const { usuario,
            activa,
            nombre,
            descripcion,
            categorias,
            objetivo_financiero,
            fondos_recaudados,
            fecha_creacion,
            fecha_limite,
            media
        } = req.body;

        //Validamos si las entradas son válidas
        if (!usuario ||
            !activa === undefined ||
            !nombre || !descripcion || !categorias ||
            !objetivo_financiero === undefined ||
            !fondos_recaudados === undefined ||
            !fecha_creacion || !fecha_limite || !media){
            res.status(400).send('Todos los campos son requeridos');
            return;
        }

        //Creamos una instancia usuario del dato provisto
        const usuarioInstance = new Usuario(
            usuario.idUsuario,
            usuario.nombre,
            usuario.cedula,
            usuario.areaTrabajo,
            usuario.presupuesto,
            usuario.telefono,
            usuario.correo,
            usuario.password,
            usuario.activa,
            usuario.categorias,
            usuario.role
        )

        /*Antes de crear el proyecto como tal, tenemos que extraer los urls recibidos y convertirlos en urls especiales
        extraídos de firebase-storage*/
        //Generamos inicialmente una id de forma automática
        const proyectoEntidad = new ProyectoEntidad();
        const idProyecto = await proyectoEntidad.generateIDKey();
        if (!idProyecto){
            res.status(500).send("Error al generar del ID proyecto a crear");
            return;
        }

        //Ahora sí, llamamos al método para almacenar las imágenes y media al sistema
        const uploadedMediaUrls: string[] = [];
        for (const [index, mediaItem] of media.entries()){
            try {
                console.log("Media data: ", mediaItem.split(',')[0]);

                const fileName = `${usuario.idUsuario}_proyecto_${nombre}_${Date.now()}_${index}`;
                const mediaUrl = await uploadMediaToFirebase(idProyecto, mediaItem, fileName);
                
                console.log("Colocamos los datos de media: ", mediaUrl)
                if (mediaUrl !== undefined){
                    uploadedMediaUrls.push(mediaUrl);
                }
            } catch (error) {
                console.error("Error subiendo los datos al bucket: ", error);
                res.status(500).send("Error al subir los archivos multimedia al sistema");
                return;
            }
        }

        console.log("Archivos de media: ", uploadedMediaUrls);

        //Una vez validado ésto, creamos el proyecto en el sistema
        const proyecto = new Proyecto(idProyecto, usuarioInstance.getIdUsuario, activa, nombre, descripcion, categorias, objetivo_financiero, fondos_recaudados, fecha_creacion, fecha_limite, uploadedMediaUrls);
        
        proyectoEntidad.addProyecto(proyecto);
        //Una vez el usuario si ha sido registrado, enviaremos un correo electrónico
        await sendEmail(
            usuarioInstance.getCorreo,
            'Felicidades, has creado un proyecto',
            'Muchas gracias por crear un proyecto con nosotros, estaremos en contacto y observando tus progresos dentro del proyecto'
        );
        console.log("Proyecto creado de forma exitosa");
        res.status(200).send(proyecto);
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error'); 
    }
}

