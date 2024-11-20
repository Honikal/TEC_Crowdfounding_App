import api from "../api";  // Asegúrate de que api esté correctamente configurado para hacer solicitudes

export const getUsers = async () => {
  try {
    const response = await api.get('/admin/deactivateAccount');
    return response.data;
  } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      throw error;
  }
};



// src/ConnectionToBackend/Routes/getUsers.ts


