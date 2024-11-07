"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _ProyectoEntidad_dbRef;
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin_1 = __importDefault(require("../config/firebaseAdmin"));
const projects_1 = __importDefault(require("../models/projects"));
class ProyectoEntidad {
    constructor() {
        _ProyectoEntidad_dbRef.set(this, void 0);
        __classPrivateFieldSet(this, _ProyectoEntidad_dbRef, firebaseAdmin_1.default.database().ref('projects'), "f");
    }
    //GETTERS Proyecto  (Método de validación para usuario por correo y contraseña)
    /**
     * Función encargada de recibir una id_proyecto y retornar el proyecto específico como tal
     * Es práctico a la hora del método GET para mostrar los datos del proyecto al modificar
     * @async
     * @param {string} id_proyecto
     * @returns {Promise<Proyecto>}       - Retorna true si encuentra un usuario con ese correo, sino, no retorna false
     */
    getProjectoByID(id_proyecto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const snapshot = yield __classPrivateFieldGet(this, _ProyectoEntidad_dbRef, "f").child(id_proyecto).get();
                if (snapshot.exists()) {
                    const proyectoData = snapshot.val();
                    return this.createProyectoFromData(proyectoData); //Transformamos los datos directamente al objeto
                }
                return null;
            }
            catch (error) {
                console.error("Error en la capa entidad, (authenticateUser): ", error);
                throw error;
            }
        });
    }
    /**
     * Función encargada de recibir una id_creador y con base a éste, retornar el proyecto del usuario como tal a realizar
     * @async
     * @param {string} id_creador
     * @returns {Promise<Proyecto>}       - Retorna true si encuentra un usuario con ese correo, sino, no retorna false
     */
    getProjectoByIDCreador(id_creador) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const snapshot = yield __classPrivateFieldGet(this, _ProyectoEntidad_dbRef, "f").get();
                if (snapshot.exists()) {
                    const proyectoData = snapshot.val();
                    const proyectos = Object.keys(proyectoData).map((id) => (Object.assign(Object.assign({}, proyectoData[id]), { idUsuario: id })));
                    return proyectos.find((proyecto) => proyecto.id_creador === id_creador) || null;
                }
                return null;
            }
            catch (error) {
                console.error("Error en la capa entidad, (authenticateUser): ", error);
                throw error;
            }
        });
    }
    /**
     * Función encargada de retornar toda una lista de proyectos dentro del sistema a mostrar,
     * luego por fuera nos encargaremos a categorizar cuales mostrar y cuales no, o cambiaremos ésta función
     * @async
     * @returns {Promise<Proyecto[]>}       - Retorna true si encuentra un usuario con ese correo, sino, no retorna false
     */
    getProjectos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const snapshot = yield __classPrivateFieldGet(this, _ProyectoEntidad_dbRef, "f").get();
                if (snapshot.exists()) {
                    const proyectoData = snapshot.val();
                    const proyectos = Object.keys(proyectoData).map((id) => {
                        const dataWithId = Object.assign(Object.assign({}, proyectoData[id]), { idUsuario: id });
                        return this.createProyectoFromData(dataWithId);
                    });
                    return proyectos;
                }
                return null;
            }
            catch (error) {
                console.error("Error en la capa entidad, (authenticateUser): ", error);
                throw error;
            }
        });
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
    addProyecto(proyecto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProyectoRef = __classPrivateFieldGet(this, _ProyectoEntidad_dbRef, "f").push();
                yield newProyectoRef.set({
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
                });
            }
            catch (error) {
                console.error("Error en la capa entidad, (authenticateUser): ", error);
                throw error;
            }
        });
    }
    //EDIT Usuario
    /**
     * Función encargada de aplicar cambios en el sistema al usuario
     * @async
     * @param {string} idProyecto            - ID del proyecto a modificar
     * @param {data}   datosActualizar       - Struct con distintos datos del objeto a modificar
     * @returns {void} No retorna nada, nada más aplica los cambios e imprime un console.log() verificando los cambios
     */
    editProyecto(idProyecto, datosActualizar) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const proyectoRef = __classPrivateFieldGet(this, _ProyectoEntidad_dbRef, "f").child(idProyecto);
                const snapshot = yield proyectoRef.get();
                //Checamos la existencia del proyecto, si no tiramos el error
                if (!snapshot.exists()) {
                    console.log(`Proyecto con ID ${idProyecto} no encontrado.`);
                    throw new Error(`El proyecto recibido no existe en la Base de Datos.`);
                }
                //Si funciona, entonces proceder con la actualización del proyecto
                yield proyectoRef.update(datosActualizar);
                console.log("Confirmación capa entidad de actualización del usuario");
            }
            catch (error) {
                console.error("Error desde la capa entidad intentando modificar al usuario: ", error);
                throw error;
            }
        });
    }
    /**
     * Función encargada de aplicar formato de base de datos a usuario clase
     * @async
     * @param {Object} proyectoData           - Objeto de usuario extraído del sistema
     * @returns {Proyecto}                    - Retorna la clase usuario como tal
     */
    createProyectoFromData(proyectoData) {
        //Extraemos la data de la base de datos como tal
        const { idProyecto, id_creador, activa, nombre, descripcion, categorias, objetivo_financiero, fondos_recaudados, fecha_creacion, fecha_limite, media } = proyectoData;
        const proyecto = new projects_1.default(idProyecto, id_creador, activa, nombre, descripcion, categorias, objetivo_financiero, fondos_recaudados, fecha_creacion, fecha_limite, media);
        return proyecto;
    }
}
_ProyectoEntidad_dbRef = new WeakMap();
exports.default = ProyectoEntidad;
