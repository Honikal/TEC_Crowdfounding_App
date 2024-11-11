import admin from "../config/firebaseAdmin";

const dotenv = require('dotenv');
dotenv.config();

//Inicializamos el bucket
const bucket = admin.storage().bucket();
console.log("Bucket usado: ", bucket.name);

/**
 * Sube un archivo (media) a Firebase Storage y retorna una URL pública.
 * @param {string} mediaData - The base64 or blob data.
 * @param {string} fileName - The name of the file to be saved.
 * @returns {Promise<string>} - The public URL of the uploaded file.
 */
const uploadMediaToFirebase = async(idProyecto: string, mediaData: string, fileName: string): Promise<string> => {
    try {
        /*Inicialmente planeabamos extraer la imagen por medio del blob, pero debido a problemas de fetching
        decidimos usar el método de Base64 strings*/

        //En éste caso removemos el área del prefijo "data:image/jpeg;base64," 
        console.log("Antes de crear el buffer");
        const base64 = mediaData.split(',')[1];
        const buffer = Buffer.from(base64, 'base64');

        //Creamos una referencia al archivo en el Storage de Firebase
        console.log("Guardamos la referencia del archivo");
        const file = bucket.file(`projects/${idProyecto}/${fileName}`);

        //Subimos el archivo, e indicamos al archivo que debe subirlo
        //como content type de acuerdo a lo que esté a la izquierda 5 digitos antes del ;
        console.log("Subiendo el archivo en Firebase");
        await file.save(buffer, {
            metadata: { contentType: mediaData.substring(5, mediaData.indexOf(';')) }
        });
        
        //Hacemos el archivo público
        console.log("Hacemos el archivo de forma pública");
        await file.makePublic();

        //Retornamos el URL del archivo a subir
        const publicURL = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
        console.log("Se ha subido el archivo de forma exitosa: ", publicURL);
        return publicURL;
    } catch (error) {
        console.error("Error subiendo los links a firebase: ", error);
        return Promise.reject(`Error subiendo el archivo a firebase: ${error}`)
    }
}
 
export default uploadMediaToFirebase;

