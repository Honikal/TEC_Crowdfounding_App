import api from "../api";
export const getProjectsUser = async ( id_creador: string ) => {
    try {
        console.log("Proyecto recibido: ", id_creador);

        const response = await api.get('/my-projects', {
            params: { id_creador }
        });
        return response.data;
    } catch (error) {
        console.error('Error en área de conexión a backend: ', error);
        throw error;
    }
}

