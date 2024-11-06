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
exports.modProjectController = void 0;
const projectDBConnection_1 = __importDefault(require("../../entities/projectDBConnection"));
const emailSender_1 = __importDefault(require("../../entities/emailSender"));
const users_1 = __importDefault(require("../../models/users"));
const getDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `Fecha: ${day}/${month}/${year} a las ${hours}:${minutes} hora de Costa Rica.`;
};
const modProjectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST') {
            console.log('Invalid method:', req.method); // Log incorrect method
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }
        //Extraemos los datos
        const { usuario, idProyecto, name, description, category, reqBudget, actualBudget, startDate, limitDate, media } = req.body;
        console.log(`Datos extraídos: ${usuario}, ${idProyecto}, ${name}, ${description}, ${category}, ${reqBudget}, ${actualBudget}, ${startDate}, ${limitDate}, ${media}`);
        //Validamos si las entradas son válidas
        if (!usuario || !idProyecto ||
            !name || !description || !category ||
            !reqBudget === undefined ||
            !actualBudget === undefined ||
            !startDate || !limitDate || !media) {
            res.status(400).send('Todos los campos son requeridos');
            return;
        }
        //Creamos una instancia usuario del dato provisto
        const usuarioInstance = new users_1.default(usuario.idUsuario, usuario.nombre, usuario.cedula, usuario.areaTrabajo, usuario.presupuesto, usuario.telefono, usuario.correo, usuario.password, usuario.activa, usuario.rol);
        //Una vez validado ésto, procederemos con el cambio del proyecto
        const proyectoEntidad = new projectDBConnection_1.default();
        yield proyectoEntidad.editProyecto(idProyecto, {
            nombre: name,
            categorias: category,
            descripcion: description,
            fecha_creacion: startDate,
            fecha_limite: limitDate,
            objetivo_financiero: reqBudget,
            fondos_recaudados: actualBudget,
            media: media
        });
        //Una vez el usuario si ha sido registrado, enviaremos un correo electrónico
        yield (0, emailSender_1.default)(usuarioInstance.getCorreo, 'Has efectuado cambios dentro de tu proyecto', `Se te hace informar que se han efectuado los cambios que has realizado dentro de tu proyecto. Se estima entonces que la modificación fue hecha en la ${getDate()}.`);
        res.status(201).send('Proyecto modificado exitosamente');
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
});
exports.modProjectController = modProjectController;
