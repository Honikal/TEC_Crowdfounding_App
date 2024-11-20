import admin from '../config/firebaseAdmin';
import Usuario from '../models/users';

export default class UsuarioEntidad {
  #dbRef;

  constructor() {
    this.#dbRef = admin.database().ref('users');
  }

  // GETTERS Usuario  (Método de validación para usuario por correo y contraseña)
  async getUserByEmail(email: string) {
    try {
      const snapshot = await this.#dbRef.get();
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const usuarios = Object.keys(userData).map((id) => ({
          ...userData[id],
          idUsuario: id,
        }));
        return usuarios.find((user) => user.correo === email) || null;
      }
      return null;
    } catch (error) {
      console.error('Error en la capa entidad, (authenticateUser): ', error);
      throw error;
    }
  }

  async getUserByID(id_usuario: string) {
    try {
      const snapshot = await this.#dbRef.child(id_usuario).get();
      if (snapshot.exists()) {
        const usuarioData = snapshot.val();
        const usuario = this.createUsuarioFromData(usuarioData);
        return usuario;
      }
      return null;
    } catch (error) {
      console.error('Error en la capa entidad, (authenticateUser): ', error);
      throw error;
    }
  }

  // Cambiar getUsers para mapear los datos correctamente
  async getUsers() {
    try {
      const snapshot = await this.#dbRef.get();
      if (snapshot.exists()) {
        const usuarioData = snapshot.val();

        const usuarios = Object.keys(usuarioData).map((id) => {
          const dataWithId = {
            ...usuarioData[id],
            idUsuario: id,
          };
          return dataWithId;
        });
        return usuarios;
      }
      return null;
    } catch (error) {
      console.error('Error en la capa entidad, (getUsers): ', error);
      throw error;
    }
  }

  // ADD
  async addUsuario(usuario: Usuario) {
    try {
      const newUsuarioRef = this.#dbRef.push();
      await newUsuarioRef.set({
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
      });
    } catch (error) {
      console.error('Error en la capa entidad, (authenticateUser): ', error);
      throw error;
    }
  }

  // EDIT Usuario
  async editUsuario(idUsuario: string, datosActualizar: any) {
    try {
      const usuarioRef = this.#dbRef.child(idUsuario);
      const snapshot = await usuarioRef.get();

      if (!snapshot.exists()) {
        console.log(`Usuario con ID ${idUsuario} no encontrado.`);
        throw new Error(`El usuario ingresado no existe en la Base de Datos.`);
      }

      await usuarioRef.update(datosActualizar);
      console.log('Confirmación capa entidad de actualización del usuario');
    } catch (error) {
      console.error('Error desde la capa entidad intentando modificar al usuario: ', error);
      throw error;
    }
  }

  createUsuarioFromData(usuarioData: any) {
    const {
      idUsuario,
      activa,
      nombre_completo,
      cedula,
      area_trabajo,
      presupuesto,
      telefono,
      correo,
      password,
      categorias,
      rol,
    } = usuarioData;

    const usuario = new Usuario(
      idUsuario,
      nombre_completo,
      cedula,
      area_trabajo,
      presupuesto,
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
