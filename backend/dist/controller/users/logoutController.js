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
exports.logoutController = void 0;
//Acá haremos acceso a todas las rutas que puede acceder la aplicación
const firebaseAdmin_1 = __importDefault(require("../../config/firebaseAdmin"));
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST') {
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }
        //Extraemos correo y contraseña
        const { email } = req.body;
        //Validamos inputs
        if (!email) {
            res.status(400).send('Email requerido para hacer logout');
            return;
        }
        //Espacio de autenticación por Firebase y Token
        let userRecord;
        try {
            userRecord = yield firebaseAdmin_1.default.auth().getUserByEmail(email);
            yield firebaseAdmin_1.default.auth().revokeRefreshTokens(userRecord.uid);
            //Quitamos los datos de chequeo de iniciar sesión
            res.status(200).send('Sesión cerrada con éxito y tokens revocados.');
        }
        catch (error) {
            if (error.code === 'auth/user-not-found') {
                res.status(404).send('Usuario no encontrado en la base de datos');
                return;
            }
            throw error;
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
});
exports.logoutController = logoutController;
