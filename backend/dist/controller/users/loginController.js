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
const axios_1 = __importDefault(require("axios"));
//Acá haremos acceso a todas las rutas que puede acceder la aplicación
const firebaseAdmin_1 = __importDefault(require("../../config/firebaseAdmin"));
const usersDBConnection_1 = __importDefault(require("../../entities/usersDBConnection"));
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
        let userRecord;
        try {
            userRecord = yield firebaseAdmin_1.default.auth().getUserByEmail(email);
        }
        catch (error) {
            if (error.code === 'auth/user-not-found') {
                res.status(404).send('Usuario no encontrado en la base de datos');
                return;
            }
            throw error;
        }
        //Conectamos entidad completa con el sistema de autenticación de Firebase, llamando al REST API de éste
        try {
            //Si el valor de signInResponse retorna de forma correcta, el usuario inició sesión, podemos extraer el usuario
            const usuarioEntidad = new usersDBConnection_1.default();
            const usuario = yield usuarioEntidad.getUserByEmail(email);
            //Checamos si el usuario es activo o no
            if (!usuario.activa) {
                res.status(404).send('Se ha bloqueado el acceso a ésta cuenta, por favor comunicarse con soporte y atención para discutir la razón');
                return;
            }
            //Haremos login desde firebase
            const apiKey = process.env.API_KEY;
            const signInResponse = yield axios_1.default.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, { email, password, returnSecureToken: true });
            res.status(200).json(usuario);
        }
        catch (authError) {
            if (authError.response && authError.response.data.error.message === 'INVALID_PASSWORD') {
                res.status(401).send('Contraseña incorrecta');
            }
            else if (authError.response && authError.response.data.error.message === 'EMAIL_NOT_FOUND') {
                res.status(404).send('Usuario no encontrado');
            }
            else {
                console.error('Error de autenticación en Firebase:', authError.response ? authError.response.data : authError.message);
                ;
                res.status(500).send('Error en autenticación de usuario, ¿quizás olvidaste la contraseña?');
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
});
exports.loginController = loginController;
