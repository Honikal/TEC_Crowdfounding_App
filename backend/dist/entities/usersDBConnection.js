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
var _UsuarioEntidad_dbRef;
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin_1 = __importDefault(require("../config/firebaseAdmin"));
const users_1 = __importDefault(require("../models/users"));
class UsuarioEntidad {
    constructor(app) {
        _UsuarioEntidad_dbRef.set(this, void 0);
        __classPrivateFieldSet(this, _UsuarioEntidad_dbRef, firebaseAdmin_1.default.database().ref('users'), "f");
    }
    //GET Usuario  (Método de validación para usuario por correo y contraseña)
    /**
     * Función encargada de la validación de un usuario por correo y contraseña
     * @async
     * @param {String} email
     * @param {String} password
     * @returns {Promise<Usuario>}       - Retorna true si encuentra un usuario con ese correo, sino, no retorna false
     */
    authenticateUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const snapshot = yield __classPrivateFieldGet(this, _UsuarioEntidad_dbRef, "f").get();
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const usuarios = Object.keys(userData).map((id) => (Object.assign(Object.assign({}, userData[id]), { idUsuario: id })));
                    return usuarios.find((user) => user.correo === email && user.password === password) || null;
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
     * Función encargada de aplicar formato de base de datos a usuario clase
     * @async
     * @param {Object} usuarioData           - Objeto de usuario extraído del sistema
     * @returns {Usuario}                    - Retorna la clase usuario como tal
     */
    createUsuarioFromData(usuarioData) {
        //Extraemos la data de la base de datos como tal
        const { idUsuario, admin, activa, nombre_completo, cedula, area_trabajo, cantidad_bolsillo, telefono, correo, password } = usuarioData;
        const usuario = new users_1.default(idUsuario, nombre_completo, cedula, area_trabajo, cantidad_bolsillo, telefono, correo, password, admin, activa);
        return usuario;
    }
}
_UsuarioEntidad_dbRef = new WeakMap();
exports.default = UsuarioEntidad;
