import api from "../api";

interface Project {
    idProyecto: string,
    id_creador: string,
    activa: boolean,
    nombre: string,
    descripcion: string,
    categorias: string[],
    fecha_limite: string,
    objetivo_financiero: number,
    media: string[]
}

export const modifyProject = async (projectData: Project) => {
    try {
        console.log("Proyecto recibido: ", projectData);

        //Creamos un objeto y parsing de datos
        const backendData = {
            idProyecto: projectData.idProyecto,
            id_creador: projectData.id_creador,
            nombre: projectData.nombre,
            descripcion: projectData.descripcion,
            categorias: projectData.categorias,
            fecha_limite: projectData.fecha_limite,
            objetivo_financiero: projectData.objetivo_financiero,
            media: projectData.media
        }

        console.log("Proyecto convertido: ", backendData);
        const response = await api.post('/edit-project', backendData)
        return response.data;
    } catch (error) {
        console.error('Error en área de conexión a backend: ', error);
        throw error;
    }
}
