import { Request, Response } from 'express';

//Acá haremos acceso a todas las rutas que puede acceder la aplicación
import admin from '../../config/firebaseAdmin';
import UsuarioEntidad from '../../entities/usersDBConnection';
import sendEmail from '../../entities/emailSender';

export const ModUserController = async(req: Request, res: Response): Promise<void> => {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST'){
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }

        //Extraemos correo y contraseña
        const { usuario_id, name, work_area, telephone, budget, categories } = req.body;

        console.log("Categorias recibidas? ", categories);
        
        //Validamos si las entradas son válidas (usualmente ya varios de éstos valores vendrán preconfirmados)
        if ( !usuario_id || !name || !work_area || !telephone || !budget || !categories){
            res.status(400).send('Todos los campos son requeridos');
            return;
        }

        //Procedemos con el cambio
        const usuarioEntidad = new UsuarioEntidad();
        await usuarioEntidad.editUsuario(usuario_id, 
            {
                nombre_completo: name,
                area_trabajo: work_area,
                presupuesto: budget,
                telefono: telephone,
                categorias: categories
            }
        )

        //res.status(201).send('Datos del usuario modificados exitosamente');

        //Buscamos ahora extraer al usuario modificado, y retornarlo con los cambios
        const usuarioModificado = await usuarioEntidad.getUserByID(usuario_id);
        if (!usuarioModificado){
            res.status(400).send("Error de datos, el usuario ha sufrido una descompostura");
        } else {
            sendEmail(usuarioModificado.getCorreo,
                "Se han efectuado cambios de datos en tu cuenta",
                "Se han completado de forma exitosa los cambios hechos a tu cuenta"
            )
            res.status(201).send("Usuario modificado exitosamente");
        }

    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error'); 
    }
};

