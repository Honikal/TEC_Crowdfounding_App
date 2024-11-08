import api from "../api";
export const getProjects = async () => {
    try {
        const response = await api.get('/main-page');
        return response.data;
    } catch (error) {
        console.error('Error en área de conexión a backend: ', error);
        throw error;
    }
}


