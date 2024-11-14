import api from "../api";
import { useNavigate } from 'react-router-dom';

export const loginUser = async (email: string, password: string, navigate: any) => {
    try {
        const response = await api.post('/login', { email, password });
        const userData = response.data;

        // Guarda el rol del usuario en localStorage
        localStorage.setItem('userRole', userData.role);

        // Redirige según el rol del usuario
        if (userData.role === 'admin') {
            navigate('/admin/project-validation'); // Corregido: comilla de cierre añadida
        } else {
            console.log("Datos de usuario después del login:", userData);
            navigate('/main-page'); 
        }

        return userData;
    } catch (error) {
        console.error('Error en área de conexión a backend:', error);
        throw error;
    }
};
