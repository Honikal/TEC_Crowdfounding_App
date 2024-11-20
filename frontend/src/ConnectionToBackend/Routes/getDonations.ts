import api from "../api";
export const getDonations = async () => {
    try {
        const response = await api.get('/admin/donations-management');
        return response.data;
    } catch (error) {
        console.error('Error en área de conexión a backend: ', error);
        throw error;
    }
}

