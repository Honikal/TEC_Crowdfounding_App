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
exports.deactivateAccController = void 0;
const emailSender_1 = __importDefault(require("../../entities/emailSender"));
const usersDBConnection_1 = __importDefault(require("../../entities/usersDBConnection"));
const getDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `Fecha: ${day}/${month}/${year} a las ${hours}:${minutes} hora de Costa Rica`;
};
const deactivateAccController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST') {
            console.log('Invalid method:', req.method); // Log incorrect method
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }
        //Extraemos los datos
        const { idAdmin, idUsuario, activa } = req.body;
        //Validamos si las entradas son válidas
        if (!idAdmin || !idUsuario || !activa === undefined) {
            res.status(400).send('Todos los campos son requeridos');
            return;
        }
        //Creamos una instancia del usuario administrador y el usuario a recibir modificación del proyecto
        const usuarioEntidad = new usersDBConnection_1.default();
        const adminInstance = yield usuarioEntidad.getUserByID(idAdmin);
        const usuarioInstance = yield usuarioEntidad.getUserByID(idUsuario);
        //Nos aseguramos de validar si los usuarios como tal fueron extraídos
        if (!usuarioInstance || !usuarioInstance.getCorreo) {
            res.status(400).send('Usuario creador del proyecto no encontrado en la base de datos');
            return;
        }
        //Una vez validado ésto, procederemos con la modificación del estado de cuenta del usuario
        yield usuarioEntidad.editUsuario(idUsuario, {
            activa: activa
        });
        const emailBodyBlock = `
        Un usuario administrador ha entrado a revisar tu cuenta y ha observado que has incumplido con algunos de varios reglamentos de la aplicación, por lo cual ha cerrado tu acceso a la cuenta en la ${getDate()}.
        
Si se trata de un malentendido o deseas consultar el cómo recuperar tu cuenta, por favor contacta con el servicio de soporte, te atenderemos rápidamente.
        
En el peor de los casos, comunicarse con el administrador en clave: ${adminInstance === null || adminInstance === void 0 ? void 0 : adminInstance.getCorreo}
`;
        const emailBodyUnlock = `
        Muchas gracias por la espera, se ha hecho una revisión más a fondo y se ha solucionado el posible inconveniente en tu cuenta.

Nos disculpamos por el dicho inconveniente causado, y le damos a informar que usted ya tiene acceso a la cuenta, siendo ésta modificación ejercida en la ${getDate()}.

Si desea averiguar más información de la situación o el inconveniente, por favor contactar con el servicio de soporte, o comunicarse con el administrador en clave: ${adminInstance === null || adminInstance === void 0 ? void 0 : adminInstance.getCorreo}.
`;
        //Una vez el usuario si ha sido registrado, enviaremos un correo electrónico
        if (!activa) {
            //Correo para bloquear el acceso a la cuenta
            yield (0, emailSender_1.default)(usuarioInstance.getCorreo, 'Se le ha bloqueado el acceso a la aplicación', emailBodyBlock.trim());
        }
        else {
            //Correo para mencionar que las circunstancias del error han sido solucionadas
            yield (0, emailSender_1.default)(usuarioInstance.getCorreo, 'Disculpe la demora, desbloqueamos el acceso a la aplicación', emailBodyUnlock.trim());
        }
        res.status(201).send('Estado de acceso de cuenta modificado exitosamente');
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
});
exports.deactivateAccController = deactivateAccController;
