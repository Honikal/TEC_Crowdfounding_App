"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Inicializamos el sistema de express para comunicarnos con el backend
const express_1 = __importDefault(require("express"));
//Inicializamos un sistema CORS para múltiple contacto en distintos PORTS
const cors_1 = __importDefault(require("cors"));
//Importamos las librerías de rutas
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
//Importamos dotenv
const dotenv = require('dotenv');
dotenv.config();
//Preparamos la app
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/*Recordatorio (para pruebas locales el archivo está en PORT = 3000), en producción, cambiar a:
*/
//console.log('ID del proyecto: ', process.env.FIREBASE_PROJECT_ID);
//console.log('Datos de la llave: ', process.env.FIREBASE_PRIVATE_KEY);
//console.log('Correo del cliente: ', process.env.FIREBASE_CLIENT_EMAIL);
//console.log('PORT dentro del .env: ', process.env.PORT);
//console.log('Database URL:', process.env.FIREBASE_DATABASE_URL);
//console.log('Storage Bucket:', process.env.FIREBASE_STORAGE_URL);
//console.log('Correo sistema:', process.env.GMAIL_USER);
//console.log('Pass sistema:', process.env.GMAIL_PASS);
console.log('API KEY:', process.env.API_KEY);
const PORT = process.env.PORT || 8000;
app.use('/', userRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server está siendo ejecutado en puerto: ${PORT}`);
});
exports.default = app;
