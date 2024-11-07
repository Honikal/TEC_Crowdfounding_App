import api from "../api";

interface User{
    name: string,
    id: string,
    email: string,
    work_area: string,
    telephone: string,
    budget: Number,
    password: string,
    confirmPassword: string,
    categories: string[]
};

export const signUpUser = async (userData: User) => {
    try {
        console.log("Sistema funcionando: ", userData);
        const response = await api.post('/signup', userData )
        return response.data;
    } catch (error) {
        console.error('Error en área de conexión a backend: ', error);
        throw error;
    }
}