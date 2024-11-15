import api from "../api";
import { useNavigate } from 'react-router-dom';

export const loginUser = async (email: string, password: string, navigate: any) => {
    try {
        // Realiza la solicitud al backend para loguear al usuario
        const response = await api.post('/login', { email, password });
        const userData = response.data;

        // Guarda el rol del usuario en localStorage para uso posterior
        localStorage.setItem('userRole', userData.role);

        // Redirige según el rol del usuario
        if (userData.role === 'admin') {
            // Redirige a la página de administración si el rol es 'admin'
            navigate('/main-page', { replace: true }); // Usar replace: true
        } else {
            // Redirige a la página principal si es un usuario normal
            console.log("Datos de usuario después del login:", userData);
            navigate('/main-page', { replace: true }); // Usar replace: true
        }

        return userData;
    } catch (error) {
        console.error('Error en área de conexión a backend:', error);
        throw error;
    }
};
