import api from "../api";
export const loginUser = async (email: String, password: String) => {
    try {
        const response = await api.post('/login', { email, password } )
        return response.data;
    } catch (error) {
        console.error('Error en área de conexión a backend: ', error);
        throw error;
    }
}


