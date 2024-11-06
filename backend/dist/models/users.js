"use strict";
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
var _Usuario_idUsuario, _Usuario_activa, _Usuario_nombre, _Usuario_cedula, _Usuario_areaTrabajo, _Usuario_presupuesto, _Usuario_categoriasPreferidas, _Usuario_telefono, _Usuario_correo, _Usuario_password, _Usuario_role, _Usuario_mentorPrize;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["REGULAR"] = "regular";
    UserRole["ADMIN"] = "admin";
    UserRole["MENTOR"] = "mentor";
})(UserRole || (exports.UserRole = UserRole = {}));
class Usuario {
    constructor(idUsuario = '', nombre = '', cedula = '', areaTrabajo = '', presupuesto = 0.0, telefono = '', correo = '', password = '', activa = true, categoriasPreferidas = [], role = UserRole.REGULAR, mentorPrize) {
        _Usuario_idUsuario.set(this, void 0);
        _Usuario_activa.set(this, void 0);
        _Usuario_nombre.set(this, void 0);
        _Usuario_cedula.set(this, void 0);
        _Usuario_areaTrabajo.set(this, void 0);
        _Usuario_presupuesto.set(this, void 0);
        _Usuario_categoriasPreferidas.set(this, void 0);
        _Usuario_telefono.set(this, void 0);
        _Usuario_correo.set(this, void 0);
        _Usuario_password.set(this, void 0);
        _Usuario_role.set(this, void 0);
        _Usuario_mentorPrize.set(this, void 0);
        __classPrivateFieldSet(this, _Usuario_idUsuario, idUsuario, "f");
        __classPrivateFieldSet(this, _Usuario_role, role, "f");
        __classPrivateFieldSet(this, _Usuario_activa, activa, "f");
        __classPrivateFieldSet(this, _Usuario_nombre, nombre, "f");
        __classPrivateFieldSet(this, _Usuario_cedula, cedula, "f");
        __classPrivateFieldSet(this, _Usuario_areaTrabajo, areaTrabajo, "f");
        __classPrivateFieldSet(this, _Usuario_categoriasPreferidas, categoriasPreferidas, "f");
        __classPrivateFieldSet(this, _Usuario_presupuesto, presupuesto, "f");
        __classPrivateFieldSet(this, _Usuario_telefono, telefono, "f");
        __classPrivateFieldSet(this, _Usuario_correo, correo, "f");
        __classPrivateFieldSet(this, _Usuario_password, password, "f");
        __classPrivateFieldSet(this, _Usuario_mentorPrize, mentorPrize, "f");
    }
    //getters
    get getIdUsuario() {
        return __classPrivateFieldGet(this, _Usuario_idUsuario, "f");
    }
    //Validación para roles
    get getRole() {
        return __classPrivateFieldGet(this, _Usuario_role, "f");
    }
    get isAdmin() {
        return __classPrivateFieldGet(this, _Usuario_role, "f") === UserRole.ADMIN;
    }
    get isRegular() {
        return __classPrivateFieldGet(this, _Usuario_role, "f") === UserRole.REGULAR;
    }
    get isMentor() {
        return __classPrivateFieldGet(this, _Usuario_role, "f") === UserRole.MENTOR;
    }
    get mentorPrize() {
        return __classPrivateFieldGet(this, _Usuario_mentorPrize, "f");
    }
    get isActiva() {
        return __classPrivateFieldGet(this, _Usuario_activa, "f");
    }
    get getNombre() {
        return __classPrivateFieldGet(this, _Usuario_nombre, "f");
    }
    get getCedula() {
        return __classPrivateFieldGet(this, _Usuario_cedula, "f");
    }
    get getCategorias() {
        return __classPrivateFieldGet(this, _Usuario_categoriasPreferidas, "f");
    }
    get getAreaTrabajo() {
        return __classPrivateFieldGet(this, _Usuario_areaTrabajo, "f");
    }
    get getPresupuesto() {
        return __classPrivateFieldGet(this, _Usuario_presupuesto, "f");
    }
    get getTelefono() {
        return __classPrivateFieldGet(this, _Usuario_telefono, "f");
    }
    get getCorreo() {
        return __classPrivateFieldGet(this, _Usuario_correo, "f");
    }
    get getPassword() {
        return __classPrivateFieldGet(this, _Usuario_password, "f");
    }
}
_Usuario_idUsuario = new WeakMap(), _Usuario_activa = new WeakMap(), _Usuario_nombre = new WeakMap(), _Usuario_cedula = new WeakMap(), _Usuario_areaTrabajo = new WeakMap(), _Usuario_presupuesto = new WeakMap(), _Usuario_categoriasPreferidas = new WeakMap(), _Usuario_telefono = new WeakMap(), _Usuario_correo = new WeakMap(), _Usuario_password = new WeakMap(), _Usuario_role = new WeakMap(), _Usuario_mentorPrize = new WeakMap();
exports.default = Usuario;
