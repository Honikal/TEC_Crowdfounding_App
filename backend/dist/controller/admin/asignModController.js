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
exports.asignModController = void 0;
const users_1 = require("../../models/users");
const emailSender_1 = __importDefault(require("../../entities/emailSender"));
const usersDBConnection_1 = __importDefault(require("../../entities/usersDBConnection"));
const asignModController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST') {
            console.log('Invalid method:', req.method); // Log incorrect method
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }
        //Extraemos los datos
        const { idUsuario, activa } = req.body;
        //Validamos si las entradas son válidas
        if (!idUsuario || !activa === undefined) {
            res.status(400).send('Todos los campos son requeridos');
            return;
        }
        //Creamos una instancia del usuario administrador y el usuario a recibir modificación del proyecto
        const usuarioEntidad = new usersDBConnection_1.default();
        const usuarioInstance = yield usuarioEntidad.getUserByID(idUsuario);
        //Nos aseguramos de validar si los usuarios como tal fueron extraídos
        if (!usuarioInstance || !usuarioInstance.getCorreo) {
            res.status(400).send('Usuario a buscar no registrado dentro del proyecto');
            return;
        }
        //Checamos si el valor de activa es true or false, dependiendo del caso, asignaremos un rol distinto
        const rol = activa ? users_1.UserRole.MENTOR : users_1.UserRole.REGULAR;
        console.log('Rol asignado: ', rol);
        //Una vez validado ésto, procederemos con la modificación del estado de cuenta del usuario
        yield usuarioEntidad.editUsuario(idUsuario, {
            rol: rol
        });
        const emailSubMentor = `Felicidades ${usuarioInstance.getNombre} has sido seleccionado para ser mentor`;
        const emailBodyMentor = `
        Has sido asignado por uno de los administradores como un usuario mentor por tus conocimientos.
        
Ésto te dará distintas oportunidades, como el ser elegido por distintos proyectos como posible mentor o consultor, y del cual podrás sacar ciertas ganancias
        
No olvides entonces de modificar tu usuario e insertar tu salario inicial deseado, y de nuevo, bienvenido al equipo.
`;
        const emailSubUnmentor = `Lamentamos que te vayas: ${usuarioInstance.getNombre}`;
        const emailBodyUnmentor = `
        Muchas gracias por haber participado en la aplicación como mentor, esperamos que hayas sacado bastante provecho como mentor.

De recibir éste correo fue porque previamente te comunicaste con uno de los administradores solicitando salir de acceso como administrador, o que cometiste una falta que obligó a sacarte.

Sin importar cual sea la razón, agradecemos tu participación en tu aplicación. 
`;
        //Una vez el usuario si ha sido registrado, enviaremos un correo electrónico
        if (activa) {
            //Correo para bloquear el acceso a la cuenta
            yield (0, emailSender_1.default)(usuarioInstance.getCorreo, emailSubMentor, emailBodyMentor.trim());
        }
        else {
            //Correo para mencionar que las circunstancias del error han sido solucionadas
            yield (0, emailSender_1.default)(usuarioInstance.getCorreo, emailSubUnmentor, emailBodyUnmentor.trim());
        }
        res.status(201).send('Se ha modificado el rol del usuario de forma exitosa');
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
});
exports.asignModController = asignModController;
