import admin from '../config/firebaseAdmin';
import Usuario from '../models/users';

export default class UsuarioEntidad {
    #dbRef;

    constructor() {
        this.#dbRef = admin.database().ref('users');
    }

    //GETTERS Usuario  (Método de validación para usuario por correo y contraseña)
    /**
     * Función encargada de validar la existencia de un usuario antes de ingresar o iniciar sesión
     * @async
     * @param {String} email
     * @returns {Promise<Usuario>}       - Retorna true si encuentra un usuario con ese correo, sino, no retorna false
     */
    async getUserByEmail(email: string) {
        try {
            const snapshot = await this.#dbRef.get();
            if (snapshot.exists()){
                const userData = snapshot.val();
                const usuarios = Object.keys(userData).map((id) => ({
                    ...userData[id],
                    idUsuario: id
                }));
                return usuarios.find((user) => user.correo === email) || null;
            }
            return null;
        } catch (error){
            console.error("Error en la capa entidad, (authenticateUser): ", error);
            throw error;
        }
    }

    /**
     * Función encargada de validar la existencia de un usuario antes de ingresar o iniciar sesión
     * @async
     * @param {string} id_usuario
     * @returns {Promise<Usuario>}       - Retorna true si encuentra un usuario con ese correo, sino, no retorna false
     */
    async getUserByID(id_usuario: string) {
        try {
            const snapshot = await this.#dbRef.child(id_usuario).get();
            if (snapshot.exists()){
                const usuarioData = snapshot.val(); 
                const usuario = this.createUsuarioFromData(usuarioData);
                return usuario;
            }
            return null;
        } catch (error){
            console.error("Error en la capa entidad, (authenticateUser): ", error);
            throw error;
        }
    }

    /**
     * Función encargada de retornar la lista completa de usuarios dentro del sistema
     * @async
     * @returns {Promise<Usuario[]>}       - Retorna true si encuentra un usuario con ese correo, sino, no retorna false
     */

    async getUsers() {
        try {
            const snapshot = await this.#dbRef.get();
            if (snapshot.exists()){
                const usuarioData = snapshot.val(); 

                const usuarios = Object.keys(usuarioData).map((id) => {
                    const dataWithId = {
                        ...usuarioData[id],
                        idUsuario: id,
                    };
                    return this.createUsuarioFromData(dataWithId)
                });
                return usuarios;
            }
            return null;
        } catch (error){
            console.error("Error en la capa entidad, (authenticateUser): ", error);
            throw error;
        }
    }
    /*
    async getUsers() {
        try {
            const snapshot = await this.#dbRef.get();
            if (snapshot.exists()){
                const usuarioData = snapshot.val(); 

                const usuarios = Object.keys(usuarioData).map((id) => {
                    return {
                        ...usuarioData[id],
                        idUsuario: id
                    }
                });
                return usuarios;
            }
            return null;
        } catch (error){
            console.error("Error en la capa entidad, (authenticateUser): ", error);
            throw error;
        }
    }
    */

    //ADD
    /**
     * Función encargada de la validación de un usuario por correo y contraseña
     * @async
     * @param {Usuario} usuario
     * @returns {void}      
     */
    async addUsuario(usuario: Usuario) {
        try {
            const newUsuarioRef = this.#dbRef.push();
            await newUsuarioRef.set(
                {
                    rol: usuario.getRole,
                    activa: usuario.isActiva,
                    nombre_completo: usuario.getNombre,
                    cedula: usuario.getCedula,
                    area_trabajo: usuario.getAreaTrabajo,
                    presupuesto: usuario.getPresupuesto,
                    telefono: usuario.getTelefono,
                    correo: usuario.getCorreo,
                    password: usuario.getPassword,
                    categorias: usuario.getCategorias,
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
     * @param {string} idUsuario             - ID del usuario a modificar
     * @param {data}   datosActualizar       - Struct con distintos datos del objeto a modificar
     * @returns {void} No retorna nada, nada más aplica los cambios e imprime un console.log() verificando los cambios
     */
    async editUsuario(idUsuario: string, datosActualizar: any){
        try {
            const usuarioRef = this.#dbRef.child(idUsuario);
            const snapshot = await usuarioRef.get();

            //Checamos la existencia del proyecto, si no tiramos el error
            if (!snapshot.exists()){
                console.log(`Usuario con ID ${idUsuario} no encontrado.`);
                throw new Error(`El usuario ingresado no existe en la Base de Datos.`);
            }

            //Si funciona, entonces proceder con la actualización del proyecto
            await usuarioRef.update(datosActualizar);
            console.log("Confirmación capa entidad de actualización del usuario");
        } catch (error) {
            console.error("Error desde la capa entidad intentando modificar al usuario: ", error);
            throw error;
        }
    }

    /**
     * Función encargada de aplicar formato de base de datos a usuario clase
     * @async
     * @param {Object} usuarioData           - Objeto de usuario extraído del sistema
     * @returns {Usuario}                    - Retorna la clase usuario como tal
     */
    createUsuarioFromData ( usuarioData: any ){
        //Extraemos la data de la base de datos como tal
        const {
            idUsuario,
            activa,
            nombre_completo,
            cedula,
            area_trabajo,
            cantidad_bolsillo,
            telefono,
            correo,
            password,
            categorias,
            rol
        } = usuarioData;

        const usuario = new Usuario(
            idUsuario,
            nombre_completo,
            cedula,
            area_trabajo,
            cantidad_bolsillo,
            telefono,
            correo,
            password,
            activa,
            categorias,
            rol
        );
        return usuario;
    }

}

