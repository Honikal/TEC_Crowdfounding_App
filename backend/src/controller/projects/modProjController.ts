import { Request, Response } from 'express';

//Acá haremos acceso a todas las rutas que puede acceder la aplicación
import UsuarioEntidad from '../../entities/usersDBConnection';
import ProyectoEntidad from '../../entities/projectDBConnection';
import sendEmail from '../../entities/emailSender';
import uploadMediaToFirebase, {clearMediaStorage} from '../../entities/storageDBConnection';

const getDate = (): string => {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `Fecha: ${day}/${month}/${year} a las ${hours}:${minutes} hora de Costa Rica.`;
}

export const ModProjectController = async(req: Request, res: Response): Promise<void> => {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST'){
            console.log('Invalid method:', req.method);  // Log incorrect method
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }

        //Extraemos los datos
        const { idProyecto, id_creador, nombre, descripcion, categorias, fecha_limite, objetivo_financiero, media } = req.body;
        console.log(`Datos extraídos: ${id_creador}, ${idProyecto}, ${nombre}, ${descripcion}, ${categorias}, ${fecha_limite}, ${objetivo_financiero}, ${media}`)

        //Validamos si las entradas son válidas
        if (!idProyecto || !id_creador || 
            !nombre || !descripcion || !categorias || !fecha_limite ||
            !objetivo_financiero === undefined ||
            !media){
            res.status(400).send('Todos los campos son requeridos');
            return;
        }

        //Creamos una instancia usuario del dato provisto
        const usuarioEntidad = new UsuarioEntidad();
        const usuarioInstance = await usuarioEntidad.getUserByID(id_creador);

        if (!usuarioInstance){
            res.status(404).send('Usuario creador del proyecto no encontrado en el sistema');
            return;
        }

        //Primero, nos encargaremos de liberar el sistema o el folder del proyecto


        //Separamos los tipos de datos entre los existentes guardados y los nuevos
        //Mapeareamos entre los elementos
        const finalMediaUrls = await Promise.all(
            media.map(async (mediaItem: string, index: number) => {
                //Si es una id existente, la mantenemos como está
                if (mediaItem.startsWith('https://')){
                    return mediaItem;
                }

                //De no ser un objeto ya existente, entonces procederemos a asumir que es una 64baseString y a guardarla
                try {
                    console.log("Media data: ", mediaItem.split(',')[0]);
    
                    const fileName = `${usuarioInstance.getIdUsuario}_proyecto_${nombre}_${Date.now()}_${index}`;
                    const mediaUrl = await uploadMediaToFirebase(idProyecto, mediaItem, fileName);
                    if (mediaUrl !== undefined){
                        return mediaUrl;
                    }
                    throw new Error ('Error en la subida de datos');
                } catch (error) {
                    console.error("Error subiendo los datos al bucket: ", error);
                    res.status(500).send("Error al subir los archivos multimedia al sistema");
                    return;
                }

            })
        )

        //Una vez validado ésto, procederemos con el cambio del proyecto
        const proyectoEntidad = new ProyectoEntidad();
        await proyectoEntidad.editProyecto(idProyecto, 
            {
                nombre: nombre,
                categorias: categorias,
                descripcion: descripcion,
                fecha_limite: fecha_limite,
                objetivo_financiero: objetivo_financiero,
                media: finalMediaUrls
            }
        )

        //Una vez el usuario si ha sido registrado, enviaremos un correo electrónico
        await sendEmail(
            usuarioInstance.getCorreo,
            'Has efectuado cambios dentro de tu proyecto',
            `Se te hace informar que se han efectuado los cambios que has realizado dentro de tu proyecto. Se estima entonces que la modificación fue hecha en la ${getDate()}.`
        );
        res.status(201).send('Proyecto modificado exitosamente');
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error'); 
    }
}

