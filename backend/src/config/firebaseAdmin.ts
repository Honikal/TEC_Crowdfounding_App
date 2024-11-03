//Acá configuramos la conexión con firebase para poder hacer contactos con la app
import * as admin from 'firebase-admin';
const dotenv = require('dotenv');
//Configuramos para que funcione
dotenv.config();

//Inicializamos la app
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_STORAGE_URL
})

export default admin;
