# Tutorial de cómo manejar firebase hecho por Honikal y el cómo implementarlo en proyectos

## Instalación de Node.js y creación de proyectos
1. Primero que todo requerimos tener node.js, la versión recomendada.
2. Luego, ocuparemos tener una cuenta como tal de acceso a firebase, y entrar a la consola de ésta. Posteriormente creamos un proyecto.
3. Durante la creación del proyecto, no es necesario darle click a habilitar Google Analytics, lo desactivamos. (o lo dejamos, en éste caso lo dejaremos)
4. Una vez creado el proyecto, iremos a la consola, y checaremos los datos como tal.
5. Inicialmente, dividimos el proyecto en 2 secciones, Backend y Frontend.

## Instalación del frontend
1. Si llegamos a utilizar una tecnología (por ejemplo, en este caso usamos React), dentro tendremos un Frontend bastante controlado.
2. Acá entonces, deberemos de ejecutar las siguientes funciones para tener las estructuras de nuestro sistema.
```bash
D:\Crowdfounding_App\frontend npm install -g firebase-tools
```
Instalamos las herramientas de firebase y firebase como tal con éstos comandos
3. Luego de ejecutarlo, debemos hacer sesion en google, para ésto, debemos de ejecutar el comando:
```bash
D:\Crowdfounding_App\frontend firebase login
```
Una vez ejecutado, debemos de ingresar el correo electrónico y contraseña usados en el Proyecto creado en Firebase, pero en general, una vez esté usado en el sistema, puede que ya se encuentre en el sistema.
* Para salirse también se puede usar
```bash
firebase logout
```
Para salir de sesión.
4. Luego de hacer ésto, podemos iniciar el proyecto, para ésto debemos de usar el comando:
```bash
D:\Crowdfounding_App\frontend firebase init
```
5. Acá entramos a la consola de nuestra terminal del firebase, acá debemos darle click a **Y**
![Configuración Firebase Proyecto](/docs/firebaseInit.png)
6. Acá, entonces seleccionaremos la opción de Hosting, siguiendo las recomendaciones del tutorial.
![Selección de Configuración del Frontend](/docs/frontendConfiguration.png)
7. Acá, elegiremos que se está usando un proyecto existente, y se elige el proyecto exacto.
8. Acá, entraremos la opción de la configuración del Hosting, en la primera opción, debemos de asignar el valor como ***build***, luego, debemos de dar la opción de ***No***, pues usaremos múltiples pantallas, y finalmente, usaremos automatic builds, acá como es opcional, pondremos ***No***.
9. Una vez creado ésto, debemos saber que tenemos una carpeta llamada **build**, en la terminal debemos correr el comando:
```bash
D:\Crowdfounding_App\frontend npm run build
```
Mediante éste comando, damos a saber que el programa debe de tomar lo que tiene en el root '/', y debe considerarlo como ubicación del proyecto, por lo tanto, debe tomar todo lo de nuestro proyecto y considerarlo como build, mediante ésto, luego podremos pasarlo a hostear.
10. Finalmente, es importante denotar que todos los cambios a denotar dentro del proyecto serán hechos dentro del Frontend, sin embargo, se requerirá hacer un deploy, para ésto podemos usar el siguiente comando:
```bash
D:\Crowdfounding_App\frontend firebase deploy
```

## Instalación del backend
1. Acá, debemos de instalar distintas dependencias, pues acá manejaremos control de Controladores, el punto de Entidades, usando distintos controles de valores.
2. Acá debemos de instalar inicialmente las siguientes dependencias:
```bash
D:\Crowdfounding_App\frontend npm install -g firebase-tools
```
```bash
D:\Crowdfounding_App\frontend npm install firebase-admin
```
```bash
D:\Crowdfounding_App\frontend npm install firebase-functions
```
```bash
D:\Crowdfounding_App\frontend npm install firebase
```
Acá, firebase-admin es esencial para la instalación de servicios dentro de Realtime Database, Cloud Storage y Storage, y firebase-functions.

3. Igual, acá hay que hacer login, y logout.
4. Acá, entonces al igual que en el frontend, debemos de utilizar el comando de init.
5. Finalmente, acá, debemos de elegir una configuración distinta, ya que trabajaremos en la aplicación para crear una base de datos, un storage, y éste sistema, nos servirá también Cloud Functions.
![Selección de Configuración del Backend](/docs/backendConfiguration.png)
6. Acá, debemos de elegir primero el lenguaje para las Cloud Functions (en éste caso usamos TypeScript), y activamos ESLint para corregir errores y mejorar estilos. Y finalmente le damos click para instalar las dependencias.
![Configuración de Cloud Functions](/docs/funcionesConfiguration.png)
Lo pegamos en nuestra consola o sistema, le damos Y, enter
7. Luego, simplemente nos toca asignar las reglas de Storage y de Database dentro del sistema, podemos dejar los valores bases que tiene.
8. Finalmente, a tomar en consideración, debemos de instalar las siguientes dependencias en el sistema:
```bash
D:\Crowdfounding_App\frontend npm install express
```
```bash
D:\Crowdfounding_App\frontend npm install axios
```
```bash
D:\Crowdfounding_App\frontend npm install cors
```
Acá, instalamos 3 librerías:
* **express:** para setear EndPoints de API dentro de la app.
* **Axios:** para manejar requests a servicios o API's, que nos permitirá comunicarnos con nuestra aplicación en Frontend, y con el lado de Backend (funciones de comunicación con la entidad).
* **CORS:** para evitar posibles errores entre comunicación de distintos orígenes, conocido como Cross-Origin Resources Sharing, que en unos casos va a ser problemas.





