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
exports.ModUserController = void 0;
const usersDBConnection_1 = __importDefault(require("../../entities/usersDBConnection"));
const ModUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'POST') {
            res.status(405).send('Solo métodos POST son permitidos');
            return;
        }
        //Extraemos correo y contraseña
        const { usuario_id, name, work_area, telephone, budget } = req.body;
        //Validamos si las entradas son válidas (usualmente ya varios de éstos valores vendrán preconfirmados)
        if (!usuario_id || !name || !work_area || !telephone || !budget) {
            res.status(400).send('Todos los campos son requeridos');
            return;
        }
        //Procedemos con el cambio
        const usuarioEntidad = new usersDBConnection_1.default();
        yield usuarioEntidad.editUsuario(usuario_id, {
            nombre_completo: name,
            area_trabajo: work_area,
            presupuesto: budget,
            telefono: telephone
        });
        res.status(201).send('Datos del usuario modificados exitosamente');
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
});
exports.ModUserController = ModUserController;
