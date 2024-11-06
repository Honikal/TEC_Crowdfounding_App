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
exports.ChngPasswordController = void 0;
//Acá haremos acceso a todas las rutas que puede acceder la aplicación
const firebaseAdmin_1 = __importDefault(require("../../config/firebaseAdmin"));
const usersDBConnection_1 = __importDefault(require("../../entities/usersDBConnection"));
const emailSender_1 = __importDefault(require("../../entities/emailSender"));
const ChngPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST') {
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }
        //Extraemos correo y contraseña
        const { email, password, confirmPassword } = req.body;
        //Validamos inputs
        if (!email || !password || !confirmPassword) {
            res.status(400).send('Email institucional y contraseñas requeridos');
            return;
        }
        //Validamos que la contraseña ingresada sea igual a la del confirm password
        if (password !== confirmPassword) {
            res.status(400).send('Las contraseñas ingresadas no coinciden');
            return;
        }
        //Autenticación por firebase
        try {
            //Checamos existencia del posible usuario
            yield firebaseAdmin_1.default.auth().getUserByEmail(email);
            //Obtenemos el link de solicitud de modificación de contraseña
            const resetLink = yield firebaseAdmin_1.default.auth().generatePasswordResetLink(email);
            //Enviaremos entonces un correo electrónico para ejercer cambio de contraseña
            yield (0, emailSender_1.default)(email, 'Resetear contraseña de ingreso', `Por favor, da click a éste link para resetear tu contraseña de acceso a la aplicación. ${resetLink}`);
            res.status(200).send('Correo de modificación de contraseña enviado de forma efectiva');
            const usuarioEntidad = new usersDBConnection_1.default();
            const usuario = usuarioEntidad.createUsuarioFromData(yield usuarioEntidad.getUserByEmail(email));
            yield usuarioEntidad.editUsuario(usuario.getIdUsuario, {
                password: password
            });
        }
        catch (authError) {
            if (authError.code === 'auth/user-not-found') {
                res.status(404).send('El usuario no se encuentra registrado');
            }
            else {
                console.error('Error enviando correo para resetear contraseña: ', authError.message);
                res.status(500).send('Error interno cambiando contraseña');
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
});
exports.ChngPasswordController = ChngPasswordController;
