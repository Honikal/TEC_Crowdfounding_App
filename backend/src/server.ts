//Inicializamos el sistema de express para comunicarnos con el backend
import express from 'express';
//Inicializamos un sistema CORS para múltiple contacto en distintos PORTS
import cors from 'cors';


//Importamos las librerías de rutas
import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes';
import adminRoutes from './routes/adminRoutes';
import donationsRoutes from './routes/donationsRoutes';

//Importamos dotenv
const dotenv = require('dotenv');
dotenv.config();

//Preparamos la app
const app = express();
app.use(cors());

//Incrementamos el uso de payload o sistema o límite para soportar mayores cargas de archivos
app.use(express.json( { limit: '100Mb' }));
app.use(express.urlencoded({ limit: '100Mb', extended: true }))

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
//console.log('API KEY:', process.env.API_KEY);

const PORT = process.env.PORT || 8000;

app.use('/', userRoutes);
app.use('/', projectRoutes);
app.use('/admin', adminRoutes);
app.use('/', donationsRoutes);
// Usar las rutas de usuarios
app.use('/api', userRoutes); // Usamos la ruta '/api/users' para las peticiones de gestión de usuarios

app.listen(PORT, () => {
    console.log(`Server está siendo ejecutado en puerto: ${PORT}`)
})
export default app;














