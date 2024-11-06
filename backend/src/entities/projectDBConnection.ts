import admin from '../config/firebaseAdmin';
import Proyecto from '../models/projects';

export default class ProyectoEntidad {
    #dbRef;

    constructor() {
        this.#dbRef = admin.database().ref('projects');
    }

    //GETTERS Proyecto  (Método de validación para usuario por correo y contraseña)
    /**
     * Función encargada de recibir una id_proyecto y retornar el proyecto específico como tal
     * Es práctico a la hora del método GET para mostrar los datos del proyecto al modificar
     * @async
     * @param {string} id_proyecto
     * @returns {Promise<Proyecto>}       - Retorna true si encuentra un usuario con ese correo, sino, no retorna false
     */
    async getProjectoByID(id_proyecto: string) {
        try {
            const snapshot = await this.#dbRef.child(id_proyecto).get();
            if (snapshot.exists()){
                const proyectoData = snapshot.val();
                return this.createProyectoFromData(proyectoData); //Transformamos los datos directamente al objeto
            }
            return null;
        } catch (error){
            console.error("Error en la capa entidad, (authenticateUser): ", error);
            throw error;
        }
    }

    /**
     * Función encargada de recibir una id_creador y con base a éste, retornar el proyecto del usuario como tal a realizar
     * @async
     * @param {string} id_creador
     * @returns {Promise<Proyecto>}       - Retorna true si encuentra un usuario con ese correo, sino, no retorna false
     */
    async getProjectoByIDCreador(id_creador: string) {
        try {
            const snapshot = await this.#dbRef.get();
            if (snapshot.exists()){
                const proyectoData = snapshot.val();
                const proyectos = Object.keys(proyectoData).map((id) => ({
                    ...proyectoData[id],
                    idUsuario: id
                }));
                return proyectos.find((proyecto) => proyecto.id_creador === id_creador) || null;
            }
            return null;
        } catch (error){
            console.error("Error en la capa entidad, (authenticateUser): ", error);
            throw error;
        }
    }

    /**
     * Función encargada de retornar toda una lista de proyectos dentro del sistema a mostrar,
     * luego por fuera nos encargaremos a categorizar cuales mostrar y cuales no, o cambiaremos ésta función
     * @async
     * @returns {Promise<Proyecto[]>}       - Retorna true si encuentra un usuario con ese correo, sino, no retorna false
     */
    async getProjectos() {
        try {
            const snapshot = await this.#dbRef.get();
            if (snapshot.exists()){
                const proyectoData = snapshot.val();

                const proyectos = Object.keys(proyectoData).map((id) => {
                    const dataWithId = {
                        ...proyectoData[id],
                        idUsuario: id,
                    };
                    return this.createProyectoFromData(dataWithId)
                });
                return proyectos;
            }
            return null;
        } catch (error){
            console.error("Error en la capa entidad, (authenticateUser): ", error);
            throw error;
        }
    }
    /*
    async getProjectos() {
        try {
            const snapshot = await this.#dbRef.get();
            if (snapshot.exists()){
                const proyectoData = snapshot.val();

                const proyectos = Object.keys(proyectoData).map((id) => {
                    return {
                        ...proyectoData[id],
                        idProyecto: id
                    }
                });
                return proyectos;
            }
            return null;
        } catch (error){
            console.error("Error en la capa entidad, (authenticateUser): ", error);
            throw error;
        }
    }*/

    //ADD
    /**
     * Función encargada de la validación de un usuario por correo y contraseña
     * @async
     * @param {Proyecto} proyecto
     * @returns {void}      
     */
    async addProyecto(proyecto: Proyecto) {
        try {
            const newProyectoRef = this.#dbRef.push();
            await newProyectoRef.set(
                {
                    activa: proyecto.isActiva,
                    nombre: proyecto.getNombre,
                    id_creador: proyecto.getIdCreador,
                    descripcion: proyecto.getDescripcion,
                    categorias: proyecto.getCategoria,
                    objetivo_financiero: proyecto.getObjetivoFinanciero,
                    fondos_recaudados: proyecto.getFondosRecaudados,
                    fecha_creacion: proyecto.getFechaCreacion,
                    fecha_limite: proyecto.getFechaLimite,
                    media: proyecto.getMedia
                }
            );
        } catch (error){
            console.error("Error en la capa entidad, (authenticateUser): ", error);
            throw error;
        }
    }

    //EDIT Usuario
    /**
     * Función encargada de aplicar cambios en el sistema al usuario
     * @async
     * @param {string} idProyecto            - ID del proyecto a modificar
     * @param {data}   datosActualizar       - Struct con distintos datos del objeto a modificar
     * @returns {void} No retorna nada, nada más aplica los cambios e imprime un console.log() verificando los cambios
     */
    async editProyecto(idProyecto: string, datosActualizar: any){
        try {
            const proyectoRef = this.#dbRef.child(idProyecto);
            const snapshot = await proyectoRef.get();

            //Checamos la existencia del proyecto, si no tiramos el error
            if (!snapshot.exists()){
                console.log(`Proyecto con ID ${idProyecto} no encontrado.`);
                throw new Error(`El proyecto recibido no existe en la Base de Datos.`);
            }

            //Si funciona, entonces proceder con la actualización del proyecto
            await proyectoRef.update(datosActualizar);
            console.log("Confirmación capa entidad de actualización del usuario");
        } catch (error) {
            console.error("Error desde la capa entidad intentando modificar al usuario: ", error);
            throw error;
        }
    }

    /**
     * Función encargada de aplicar formato de base de datos a usuario clase
     * @async
     * @param {Object} proyectoData           - Objeto de usuario extraído del sistema
     * @returns {Proyecto}                    - Retorna la clase usuario como tal
     */
    createProyectoFromData ( proyectoData: any ){
        //Extraemos la data de la base de datos como tal
        const {
            idProyecto,
            id_creador,
            activa,
            nombre,
            descripcion,
            categorias,
            objetivo_financiero,
            fondos_recaudados,
            fecha_creacion,
            fecha_limite,
            media 
        } = proyectoData;

        const proyecto = new Proyecto(
            idProyecto,
            id_creador,
            activa,
            nombre,
            descripcion,
            categorias,
            objetivo_financiero,
            fondos_recaudados,
            fecha_creacion,
            fecha_limite,
            media
        );
        return proyecto;
    }

}

