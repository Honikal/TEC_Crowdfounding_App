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
exports.createProjectController = void 0;
const projectDBConnection_1 = __importDefault(require("../../entities/projectDBConnection"));
const projects_1 = __importDefault(require("../../models/projects"));
const emailSender_1 = __importDefault(require("../../entities/emailSender"));
const users_1 = __importDefault(require("../../models/users"));
const createProjectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST') {
            console.log('Invalid method:', req.method); // Log incorrect method
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }
        //Extraemos los datos
        const { usuario, activa, name, description, category, reqBudget, actualBudget, startDate, limitDate, media } = req.body;
        //Validamos si las entradas son válidas
        if (!usuario ||
            !activa === undefined ||
            !name || !description || !category ||
            !reqBudget === undefined ||
            !actualBudget === undefined ||
            !startDate || !limitDate || !media) {
            res.status(400).send('Todos los campos son requeridos');
            return;
        }
        //Creamos una instancia usuario del dato provisto
        const usuarioInstance = new users_1.default(usuario.idUsuario, usuario.nombre, usuario.cedula, usuario.areaTrabajo, usuario.presupuesto, usuario.telefono, usuario.correo, usuario.password, usuario.admin, usuario.activa);
        //Una vez validado ésto, creamos el proyecto en el sistema
        const proyectoEntidad = new projectDBConnection_1.default();
        const proyecto = new projects_1.default('', usuarioInstance.getIdUsuario, activa, name, description, category, reqBudget, actualBudget, startDate, limitDate, media);
        proyectoEntidad.addProyecto(proyecto);
        //Una vez el usuario si ha sido registrado, enviaremos un correo electrónico
        yield (0, emailSender_1.default)(usuarioInstance.getCorreo, 'Felicidades, has creado un proyecto', 'Muchas gracias por crear un proyecto con nosotros, estaremos en contacto y observando tus progresos dentro del proyecto');
        res.status(201).send('Proyecto creado exitosamente');
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
});
exports.createProjectController = createProjectController;
