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
            navigate('/admin/validate-projects'); // Ruta de administración (ajusta según tu app)
        } else {
            console.log("Datos de usuario después del login:", userData);

            navigate('/main-page'); // Ruta de usuario regular (ajusta según tu app)
        }

        return userData;
    } catch (error) {
        console.error('Error en área de conexión a backend:', error);
        throw error;
    }
};
