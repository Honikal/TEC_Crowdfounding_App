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
exports.signupController = void 0;
//Acá haremos acceso a todas las rutas que puede acceder la aplicación
const firebaseAdmin_1 = __importDefault(require("../../config/firebaseAdmin"));
const usersDBConnection_1 = __importDefault(require("../../entities/usersDBConnection"));
const users_1 = __importDefault(require("../../models/users"));
const emailSender_1 = __importDefault(require("../../entities/emailSender"));
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST') {
            console.log('Invalid method:', req.method); // Log incorrect method
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }
        //Extraemos los datos
        const { name, id, email, work_area, telephone, budget, password, confirmPassword, categories } = req.body;
        //Validamos si las entradas son válidas
        if (!name || !id || !email || !work_area || !categories || !telephone || !budget || !password || !confirmPassword) {
            res.status(400).send('Todos los campos son requeridos');
            return;
        }
        //Validamos que la contraseña ingresada sea igual a la del confirm password
        if (password !== confirmPassword) {
            res.status(400).send('Las contraseñas ingresadas no coinciden');
            return;
        }
        //Validamos que el usuario ya esté registrado en la cuenta (solo un correo por usuario)
        //Corrección, no checamos dentro de la base de datos, checaremos con el sistema de autenticación
        //Paso 1: Creamos los usuarios en Autenticación de Firebase
        try {
            const userRecord = yield firebaseAdmin_1.default.auth().createUser({
                email,
                password,
                displayName: name,
            });
            //Paso 2: Si no existe error de usuario ya existente, guardamos el usuario en la base de datos
            //Crear un nuevo usuario en la base de datos
            const usuarioEntidad = new usersDBConnection_1.default();
            const usuario = new users_1.default('', name, id, work_area, budget, telephone, email, password, true, categories);
            usuarioEntidad.addUsuario(usuario);
            //Una vez el usuario si ha sido registrado, enviaremos un correo electrónico
            yield (0, emailSender_1.default)(usuario.getCorreo, `Bienvenido a Crowdfounder ${usuario.getNombre}`, 'Bienvenido a Crowdfounder, aplicación del TEC donde podrás crear y producir tus futuros proyectos. Muchas gracias por unirte');
            //Enviamos el usuario al sistema
            const user = usuarioEntidad.createUsuarioFromData(yield usuarioEntidad.getUserByEmail(email));
            res.status(200).json(user.toJson());
        }
        catch (authError) {
            if (authError.code === 'auth/email-already-exists') {
                res.status(409).send('El usuario ya está registrado');
            }
            else {
                throw authError;
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
});
exports.signupController = signupController;
