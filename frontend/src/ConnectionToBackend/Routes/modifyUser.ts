import api from "../api";

interface User{
    idUsuario: string,
    nombre: string,
    areaTrabajo: string,
    telefono: string,
    presupuesto: number,
    categorias: string[]
};

export const modifyUser = async (userData: User) => {
    try {
        console.log("Usuario pasado: ", userData);

        //Creamos un objeto y hacemos parsing de datos
        const backendData = {
            'usuario_id': userData.idUsuario,
            'name': userData.nombre, 
            'work_area': userData.areaTrabajo,
            'telephone': userData.telefono,
            'budget': userData.presupuesto,
            'categories': userData.categorias
        }

        console.log("Usuario convertido: ", backendData);

        const response = await api.post('/user-settings', backendData)
        return response.data;
    } catch (error) {
        console.error('Error en área de conexión a backend: ', error);
        throw error;
    }
}


