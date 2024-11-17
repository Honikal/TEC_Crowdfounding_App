import api from "../api";  // Asegúrate de que api esté correctamente configurado para hacer solicitudes

export const getUsers = async () => {
  try {
    const response = await api.get("http://localhost:3001/api/users");
    const data = response.data;

    // Transformamos el objeto en un array
    const usuariosArray = Object.keys(data).map((id) => ({
      id,
      ...data[id],

    }));

    return usuariosArray;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};



// src/ConnectionToBackend/Routes/getUsers.ts


