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
exports.loginController = void 0;
//Acá haremos acceso a todas las rutas que puede acceder la aplicación
const firebaseAdmin_1 = __importDefault(require("../config/firebaseAdmin"));
const usersDBConnection_1 = __importDefault(require("../entities/usersDBConnection"));
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST') {
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }
        //Extraemos correo y contraseña
        const { email, password } = req.body;
        //Validamos inputs
        if (!email || !password) {
            res.status(400).send('Email institucional y contraseña requeridos');
            return;
        }
        //Espacio de autenticación por Firebase y Token
        //Inicializamos Usuario entidad y tomamos el usuario por correo
        const usuarioEntidad = new usersDBConnection_1.default(firebaseAdmin_1.default);
        const usuario = yield usuarioEntidad.authenticateUser(email, password);
        //Checamos la existencia de un usuario
        if (!usuario) {
            res.status(404).send('Usuario no encontrado en la base de datos');
            return;
        }
        //Respondemos con la información del usuario
        res.status(200).json(usuario);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
});
exports.loginController = loginController;
