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
exports.deactivateProjController = void 0;
const projectDBConnection_1 = __importDefault(require("../../entities/projectDBConnection"));
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
const deactivateProjController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST') {
            console.log('Invalid method:', req.method); // Log incorrect method
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }
        //Extraemos los datos
        const { idAdmin, idProyecto, idProyectoCreador, activa } = req.body;
        //Validamos si las entradas son válidas
        if (!idAdmin || !idProyecto || !idProyectoCreador || !activa === undefined) {
            res.status(400).send('Todos los campos son requeridos');
            return;
        }
        //Creamos una instancia del usuario administrador y el usuario a recibir modificación del proyecto
        const usuarioEntidad = new usersDBConnection_1.default();
        const adminInstance = yield usuarioEntidad.getUserByID(idAdmin);
        const usuarioInstance = yield usuarioEntidad.getUserByID(idProyectoCreador);
        //Nos aseguramos de validar si los usuarios como tal fueron extraídos
        if (!usuarioInstance || !usuarioInstance.getCorreo) {
            res.status(400).send('Usuario creador del proyecto no encontrado en la base de datos');
            return;
        }
        //Una vez validado ésto, procederemos con el cambio del proyecto
        const proyectoEntidad = new projectDBConnection_1.default();
        yield proyectoEntidad.editProyecto(idProyecto, {
            activa: activa,
        });
        const emailBody = `
        Un usuario administrador ha entrado a revisar tu proyecto y ha ejercido cambios de acceso al proyecto en la ${getDate()}.
        
Si encuentras que éste proyecto no está activo o a la vista del público y quieres saber la razón, por favor contacta a soporte, te atenderemos rápidamente.
        
En el peor de los casos, comunicarse con: ${adminInstance === null || adminInstance === void 0 ? void 0 : adminInstance.getCorreo}
`;
        //Una vez el usuario si ha sido registrado, enviaremos un correo electrónico
        yield (0, emailSender_1.default)(usuarioInstance.getCorreo, 'Se ha modificado el estado de tu proyecto', emailBody.trim());
        res.status(201).send('Proyecto modificado exitosamente');
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
});
exports.deactivateProjController = deactivateProjController;
