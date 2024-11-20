import api from "../api";  // Asegúrate de que api esté correctamente configurado para hacer solicitudes

export const ManageUserAdmin = async (idAdmin: string, idUsuario: string, estado: boolean) => {
  try {
    const response = await api.post('/admin/deactivateAccount',
      { 
        idAdmin,
        idUsuario,
        estado
      });
    return response.data;
  } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      throw error;
  }
};



// src/ConnectionToBackend/Routes/getUsers.ts


