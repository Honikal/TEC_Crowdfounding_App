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
exports.getUsersController = void 0;
//Acá haremos acceso a todas las rutas que puede acceder la aplicación
const usersDBConnection_1 = __importDefault(require("../../entities/usersDBConnection"));
const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'GET') {
            console.log('Invalid method:', req.method); // Log incorrect method
            res.status(405).send('Solo métodos GET son permitidos');
            return;
        }
        //Creamos una instancia usuario del dato provisto
        const usuarioEntidad = new usersDBConnection_1.default();
        const usuarios = yield usuarioEntidad.getUsers();
        //Respondemos con la lista de los proyectos
        console.log("Lista de usuarios dentro del sistema: ", usuarios);
        res.status(200).json(usuarios);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
});
exports.getUsersController = getUsersController;
