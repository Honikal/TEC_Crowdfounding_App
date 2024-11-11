import api from "../api";
export const getProjectsCategory = async (category: string) => {
    try {
        console.log("Categoría recibida: ", category);

        const response = await api.get('/search/categories', {
            params: { category }
        });
        return response.data;
    } catch (error) {
        console.error('Error en área de conexión a backend: ', error);
        throw error;
    }
}


