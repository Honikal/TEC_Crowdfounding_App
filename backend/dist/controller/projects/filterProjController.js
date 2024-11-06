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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterProjController = void 0;
const projectDBConnection_1 = __importDefault(require("../../entities/projectDBConnection"));
const usersDBConnection_1 = __importDefault(require("../../entities/usersDBConnection"));
const getDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `Fecha: ${day}/${month}/${year} a las ${hours}:${minutes} hora de Costa Rica.`;
};
const filterProjController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST') {
            console.log('Invalid method:', req.method); // Log incorrect method
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }
        //Extraemos los datos
        const { idUsuario } = req.body;
        //Validamos si las entradas son válidas
        if (!idUsuario) {
            res.status(400).send('El id del usuario es requerido');
            return;
        }
        //Creamos una instancia usuario del dato provisto
        const usuarioEntidad = new usersDBConnection_1.default();
        const usuarioInstancia = yield usuarioEntidad.getUserByID(idUsuario);
        if (!usuarioInstancia) {
            res.status(404).send('Usuario no encontrado en la base de datos');
            return;
        }
        //Tomamos todos los proyectos
        const proyectoEntidad = new projectDBConnection_1.default();
        const allProyectos = yield proyectoEntidad.getProjectos();
        if (!allProyectos || allProyectos.length === 0) {
            res.status(200).json([]); //No hay proyectos a filtrar
            return;
        }
        //Filtramos los proyectos basados en las categorías preferidas del usuario
        const categoriasPreferidas = usuarioInstancia.getCategorias;
        const filteredProjects = allProyectos.filter(proyect => proyect.getCategoria.some((categoria) => categoriasPreferidas.includes(categoria)));
        //Respondemos con la lista de los proyectos
        res.status(200).json(filteredProjects);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
});
exports.filterProjController = filterProjController;
