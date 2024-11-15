import api from "../api";
import { useNavigate } from 'react-router-dom';

export const loginUser = async (email: string, password: string, navigate: any) => {
    try {
        // Realiza la solicitud al backend para loguear al usuario
        const response = await api.post('/login', { email, password });
        const userData = response.data;

        // Verificar que el rol del usuario se recibe correctamente
        console.log('Rol recibido:', userData.role); // Verifica el valor del rol

        // Guarda el rol del usuario en localStorage
        localStorage.setItem('userRole', userData.role);

        // Verifica el rol y redirige directamente a la página correcta
        if (userData.role.trim().toLowerCase() === 'admin') {
            // Si es admin, redirige directamente a /admin/project-validation
            navigate('/admin/project-validation', { replace: true }); // Reemplaza la ruta en el historial
        } else {
            // Si no es admin, redirige a /main-page
            navigate('/main-page', { replace: true }); // Reemplaza la ruta en el historial
        }

        return userData;
    } catch (error) {
        console.error('Error en área de conexión a backend:', error);
        throw error;
    }
};
