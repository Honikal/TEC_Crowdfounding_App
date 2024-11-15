import api from "../api";  // Asegúrate de que api esté correctamente configurado para hacer solicitudes

export const getUsers = async () => {
  try {
    // Realizamos la solicitud GET al backend
    const response = await api.get('/api/users');  // La ruta que definimos en el backend
    return response.data;  // Retornamos los datos de usuarios
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
};


