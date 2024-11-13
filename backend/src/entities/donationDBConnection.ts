import admin from '../config/firebaseAdmin';
import Donacion from '../models/donation';

export default class DonacionEntidad {
    #dbRef;

    constructor() {
        this.#dbRef = admin.database().ref('donations');
    }

    //GETTERS Donación  (Método de validación para usuario por correo y contraseña)
    /**
    * Función encargada de recibir una id_donacion y retornar una donación específica como tal
    */
    async getDonationsByID(id_donacion: string) {
        try {
            const snapshot = await this.#dbRef.child(id_donacion).get();
            if (snapshot.exists()){
                const donacionData = snapshot.val();
                return this.createDonacionFromData(donacionData); //Transformamos los datos directamente al objeto
            }
            return null;
        } catch (error){
            console.error("Error en la capa entidad, (authenticateUser): ", error);
            throw error;
        }
    }

    //Función encargada de recibir una id_donador y con base a éste, retornar todas las donaciones hechas por el usuario
    async getProjectoByIDDonador(id_donador: string) {
        try {
            const snapshot = await this.#dbRef.get();
            if (snapshot.exists()){
                const donacionData = snapshot.val();
                const donaciones = Object.keys(donacionData).map((id) => ({
                    ...donacionData[id],
                    idDonacion: id
                }));
                return donaciones.filter((donacion) => donacion.idDonante === id_donador);
            }
            return null;
        } catch (error){
            console.error("Error en la capa entidad, (authenticateUser): ", error);
            throw error;
        }
    }

    //Función encargada de extraer o recibir una id_proyecto, y con base a éste, retornar el grupo de donaciones hechas a éste proyecto
    async getProjectoByIDProyecto(id_proyecto: string) {
        try {
            const snapshot = await this.#dbRef.get();
            if (snapshot.exists()){
                const donacionData = snapshot.val();
                const donaciones = Object.keys(donacionData).map((id) => ({
                    ...donacionData[id],
                    idDonacion: id
                }));
                return donaciones.filter((donacion) => donacion.idProyecto === id_proyecto);
            }
            return null;
        } catch (error){
            console.error("Error en la capa entidad, (authenticateUser): ", error);
            throw error;
        }
    }

    /*
    Función encargada de retornar toda una lista de proyectos dentro del sistema a mostrar,
    luego por fuera nos encargaremos a categorizar cuales mostrar y cuales no, o cambiaremos ésta función
    */
    async getDonations() {
        try {
            const snapshot = await this.#dbRef.get();
            if (!snapshot.exists()){
                return [];
            }
            const donacionData = snapshot.val();
            const donaciones = Object.keys(donacionData).map((id) => {
                const dataWithId = {
                    ...donacionData[id],
                    idDonacion: id,
                };
                //return this.createProyectoFromData(dataWithId);
                return dataWithId;
            });
            return donaciones;
        } catch (error){
            console.error("Error en la capa entidad, (authenticateUser): ", error);
            throw error;
        }
    }

    //ADD
    //Función encargada de la creación de la factura o prueba de la donación
    async addDonacion(donacion: Donacion) {
        try {
            const newDonacionRef = this.#dbRef.push();
            await newDonacionRef.set(
                {
                    idDonacion: donacion.getIdDonador,
                    idProyecto: donacion.getIdProyecto,
                    idDonante: donacion.getIdDonador,
                    fecha_donacion: donacion.getFechaDonacion,
                    monto_donado: donacion.getMonto
                }
            );
        } catch (error){
            console.error("Error en la capa entidad, (authenticateUser): ", error);
            throw error;
        }
    }

    //Función encargada de aplicar formato de base de datos a la clase donación
    createDonacionFromData ( donacionData: any ){
        //Extraemos la data de la base de datos como tal
        const {
            idDonacion,
            idProyecto,
            idDonante,
            fecha_donacion,
            monto_donado
        } = donacionData;

        const donacion = new Donacion(
            idDonacion,
            idProyecto,
            idDonante,
            fecha_donacion,
            monto_donado
        );
        return donacion;
    }

}

