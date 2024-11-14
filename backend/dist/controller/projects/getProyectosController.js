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
exports.getProjectController = void 0;
//Acá haremos acceso a todas las rutas que puede acceder la aplicación
const projectDBConnection_1 = __importDefault(require("../../entities/projectDBConnection"));
const usersDBConnection_1 = __importDefault(require("../../entities/usersDBConnection"));
function parseDateString(dateStr) {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
        return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
    }
    throw new Error('Dato inválido de fecha');
}
const getProjectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Checamos la solicitud sea un POST
        if (req.method !== 'GET') {
            console.log('Invalid method:', req.method); // Log incorrect method
            res.status(405).send('Solo métodos GET son permitidos');
            return;
        }
        //Tomamos todos los proyectos
        const proyectoEntidad = new projectDBConnection_1.default();
        const usuarioEntidad = new usersDBConnection_1.default();
        const allProyectos = (yield proyectoEntidad.getProjectos()) || [];
        if (!allProyectos) {
            console.log("No se encontraron proyectos");
            res.status(400).send('No se encontraron proyectos');
            return;
        }
        res.status(201).send('Se extrayeron los proyectos de forma base');
        const proyectosTransformados = yield Promise.all(allProyectos.map((proyecto) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("Si se entra a modificar datos");
            const jsonPr = proyecto.toJson();
            const usuario = yield usuarioEntidad.getUserByID(jsonPr.id_creador);
            const nombreCreador = usuario ? usuario.getNombre : 'Desconocido';
            //Calcular días restantes
            //const fechaCreacion = parseDateString(proyecto.getFechaCreacion);
            const fechaLimite = parseDateString(jsonPr.fecha_limite);
            console.log("Fecha límite modificada: ", fechaLimite);
            const hoy = new Date();
            const diasRestantes = Math.ceil((fechaLimite.getTime() - hoy.getTime()) / (1000 * 3600 * 24));
            console.log("Dias restantes calculados: ", diasRestantes);
            //Calcular porcentaje de fondos
            const porcentajeFundado = ((jsonPr.fondos_recaudados / jsonPr.objetivo_financiero) * 100).toFixed(2) + '%';
            return {
                activa: jsonPr.activa,
                nombre: jsonPr.nombre,
                categorias: jsonPr.categorias,
                descripcion: jsonPr.descripcion,
                idProyecto: jsonPr.idProyecto,
                id_creador: jsonPr.id_creador,
                media: jsonPr.media,
                nombre_creador: nombreCreador,
                diasRestantes: diasRestantes,
                porcentajeFundado: porcentajeFundado,
            };
        })));
        console.log("Proyectos a mostrar modificados: ", allProyectos);
        //Respondemos con la lista de los proyectos
        res.status(200).json(proyectosTransformados);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
});
exports.getProjectController = getProjectController;
