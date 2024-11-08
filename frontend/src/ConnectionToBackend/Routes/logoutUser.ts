import api from "../api";

export const logoutUser = async (email: string | undefined) => {
    try {
        const response = await api.post('/logout', { email } )
        return response.data;
    } catch (error) {
        console.error('Error en área de conexión a backend: ', error);
        throw error;
    }
}


