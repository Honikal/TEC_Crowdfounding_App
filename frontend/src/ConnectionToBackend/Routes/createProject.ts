import api from "../api";

    interface Proyecto {
        id_creador: string,
        activa: boolean,
        nombre: string,
        descripcion: string,
        categorias: string[],
        fecha_creacion: string,
        fecha_limite: string,
        fondos_recaudados: number,
        objetivo_financiero: number,
        media: string[]
    }

    interface User{
        idUsuario: string,
        activa: boolean,
        categorias: string[],
        cedula: string,
        correo: string,
        nombre: string,
        areaTrabajo: string,
        telefono: string,
        presupuesto: number,
        role: string
    };

    export const createProject = async (usuario: User, proyecto: Proyecto) => {
        try {
            console.log(`Checando valores prueba: usuario ${usuario.nombre}, proyecto: ${proyecto.nombre}`)

            const response = await api.post('/new-project', {
                usuario,
                activa: proyecto.activa,
                nombre: proyecto.nombre,
                descripcion: proyecto.descripcion,
                categorias: proyecto.categorias,
                objetivo_financiero: proyecto.objetivo_financiero,
                fondos_recaudados: proyecto.fondos_recaudados,
                fecha_creacion: proyecto.fecha_creacion,
                fecha_limite: proyecto.fecha_limite,
                media: proyecto.media
            });
            return response.data;
        } catch (error) {
            console.error('Error en área de conexión a backend: ', error);
            throw error;
        }
    }


