import api from "../api";

export const changePasswordUser = async (email: string, password: string, confirmPassword: string) => {
    try {
        console.log("Sistema funcionando: ", email);
        const response = await api.post('/change-password', { email, password, confirmPassword } );
    } catch (error) {
        console.error('Error en área de conexión a backend: ', error);
        throw error;
    }
}