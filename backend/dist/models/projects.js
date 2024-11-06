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
var _Proyecto_idProyecto, _Proyecto_idCreador, _Proyecto_activa, _Proyecto_nombre, _Proyecto_descripcion, _Proyecto_categoria, _Proyecto_objetivoFinanciero, _Proyecto_fondosRecaudados, _Proyecto_fechaCreacion, _Proyecto_fechaLimite, _Proyecto_media;
Object.defineProperty(exports, "__esModule", { value: true });
class Proyecto {
    /**
     * Constructor de clase Proyectos
     * @param {string} idProyecto            - ID única generada al ser guardado en RealTime Database de firebase
     * @param {string} idCreador             - ID única generada en RDB Firebase, referenciando al usuario creador
     * @param {boolean} activa               - Nombre completo del proyecto
     * @param {string} nombre                - Nombre completo del proyecto
     * @param {string} descripcion           - Descripción del proyecto a realizarse
     * @param {string[]} categoria           - Categoría o método de categorización de un proyecto
     * @param {float} objetivoFinanciero     - Objetivo financiero o dinero esperado a recolectarse
     * @param {string} fechaLimite           - Fecha en la que se espera llegar a recaudar el objetivo financiero antes de cerrar el proyecto
     * @param {string} fechaCreacion         - Fecha en la que se espera llegar a recaudar el objetivo financiero antes de cerrar el proyecto
     * @param {string[]} media               - Grupos de id's o distintos valores de identificación para tomar fotos o videos del proyecto
    */
    constructor(idProyecto = '', idCreador = '', activa = true, nombre = '', descripcion = '', categoria = [], objetivoFinanciero = 0.0, fondosRecaudados = 0.0, fechaCreacion = '', fechaLimite = '', media = []) {
        _Proyecto_idProyecto.set(this, void 0);
        _Proyecto_idCreador.set(this, void 0);
        _Proyecto_activa.set(this, void 0);
        _Proyecto_nombre.set(this, void 0);
        _Proyecto_descripcion.set(this, void 0);
        _Proyecto_categoria.set(this, void 0);
        _Proyecto_objetivoFinanciero.set(this, void 0);
        _Proyecto_fondosRecaudados.set(this, void 0);
        _Proyecto_fechaCreacion.set(this, void 0);
        _Proyecto_fechaLimite.set(this, void 0);
        _Proyecto_media.set(this, void 0);
        __classPrivateFieldSet(this, _Proyecto_idProyecto, idProyecto, "f"),
            __classPrivateFieldSet(this, _Proyecto_idCreador, idCreador, "f"),
            __classPrivateFieldSet(this, _Proyecto_activa, activa, "f"),
            __classPrivateFieldSet(this, _Proyecto_nombre, nombre, "f"),
            __classPrivateFieldSet(this, _Proyecto_descripcion, descripcion, "f"),
            __classPrivateFieldSet(this, _Proyecto_categoria, categoria, "f"),
            __classPrivateFieldSet(this, _Proyecto_objetivoFinanciero, objetivoFinanciero, "f"),
            __classPrivateFieldSet(this, _Proyecto_fondosRecaudados, fondosRecaudados, "f"),
            __classPrivateFieldSet(this, _Proyecto_fechaCreacion, fechaCreacion, "f"),
            __classPrivateFieldSet(this, _Proyecto_fechaLimite, fechaLimite, "f"),
            __classPrivateFieldSet(this, _Proyecto_media, media, "f");
    }
    //getters
    get getIdProyecto() {
        return __classPrivateFieldGet(this, _Proyecto_idProyecto, "f");
    }
    get getIdCreador() {
        return __classPrivateFieldGet(this, _Proyecto_idCreador, "f");
    }
    get isActiva() {
        return __classPrivateFieldGet(this, _Proyecto_activa, "f");
    }
    get getNombre() {
        return __classPrivateFieldGet(this, _Proyecto_nombre, "f");
    }
    get getDescripcion() {
        return __classPrivateFieldGet(this, _Proyecto_descripcion, "f");
    }
    get getCategoria() {
        return __classPrivateFieldGet(this, _Proyecto_categoria, "f");
    }
    get getObjetivoFinanciero() {
        return __classPrivateFieldGet(this, _Proyecto_objetivoFinanciero, "f");
    }
    get getFondosRecaudados() {
        return __classPrivateFieldGet(this, _Proyecto_fondosRecaudados, "f");
    }
    get getFechaCreacion() {
        return __classPrivateFieldGet(this, _Proyecto_fechaCreacion, "f");
    }
    get getFechaLimite() {
        return __classPrivateFieldGet(this, _Proyecto_fechaLimite, "f");
    }
    get getMedia() {
        return __classPrivateFieldGet(this, _Proyecto_media, "f");
    }
}
_Proyecto_idProyecto = new WeakMap(), _Proyecto_idCreador = new WeakMap(), _Proyecto_activa = new WeakMap(), _Proyecto_nombre = new WeakMap(), _Proyecto_descripcion = new WeakMap(), _Proyecto_categoria = new WeakMap(), _Proyecto_objetivoFinanciero = new WeakMap(), _Proyecto_fondosRecaudados = new WeakMap(), _Proyecto_fechaCreacion = new WeakMap(), _Proyecto_fechaLimite = new WeakMap(), _Proyecto_media = new WeakMap();
exports.default = Proyecto;
