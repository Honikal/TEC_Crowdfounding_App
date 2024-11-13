import api from "../api";
export const donateProject = async (id_proyecto: string, id_donador: string, monto_donado: number) => {
    try {
        const response = await api.post('/donate-project', {
            id_proyecto,
            id_donador,
            monto_donado
        })
        return response.data;
    } catch (error) {
        console.error('Error en área de conexión a backend: ', error);
        throw error;
    }
}


