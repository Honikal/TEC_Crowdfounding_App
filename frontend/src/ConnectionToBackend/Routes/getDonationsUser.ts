import api from "../api";
export const getDonationsUser = async ( id_usuario: string ) => {
    try {
        const response = await api.get('/my-donations', {
            params: { id_usuario }
        });
        return response.data;
    } catch (error) {
        console.error('Error en área de conexión a backend: ', error);
        throw error;
    }
}

