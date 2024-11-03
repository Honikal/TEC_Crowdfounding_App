import admin from '../config/firebaseAdmin';
import Usuario from '../models/users';

export default class UsuarioEntidad {
    #dbRef;

    constructor(app: any) {
        this.#dbRef = admin.database().ref('users');
    }

    //GET Usuario  (Método de validación para usuario por correo y contraseña)
    /**
     * Función encargada de la validación de un usuario por correo y contraseña
     * @async
     * @param {String} email
     * @param {String} password
     * @returns {Promise<Usuario>}       - Retorna true si encuentra un usuario con ese correo, sino, no retorna false
     */
    async authenticateUser(email: string, password: string) {
        try {
            const snapshot = await this.#dbRef.get();
            if (snapshot.exists()){
                const userData = snapshot.val();
                const usuarios = Object.keys(userData).map((id) => ({
                    ...userData[id],
                    idUsuario: id
                }));
                return usuarios.find((user) => user.correo === email && user.password === password) || null;
            }
            return null;
        } catch (error){
            console.error("Error en la capa entidad, (authenticateUser): ", error);
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
            admin,
            activa,
            nombre_completo,
            cedula,
            area_trabajo,
            cantidad_bolsillo,
            telefono,
            correo,
            password
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
            admin,
            activa
        );
        return usuario;
    }

}

