# Reglas usadas para el control del Backend

Acá daremos uso de los distintos pasos de instalación usados para el backend, así como los pasos a seguir en caso de hacer pruebas como tal.

## Instalación del área de trabajo

Inicialmente, empezamos inicializando el proyecto, usando la línea de comandos y el siguiente comando

```bash
npm init
```

En otros casos también se puede usar:

```bash
npm init -y
```

Aunque éste autocompletara los datos iniciales y el archivo generado se verá distinto, una vez ejecutado éste comando en nuestra carpeta aparecerá un **package.json**, éste archivo es necesario para la instalación de librerías.

*Cabe recalcar, que una vez hecho ésto no es necesario ejecutarlo más.*

El archivo generado se ve de ésta manera:

```json
{
  "name": "nombre",
  "version": "1.0.0",
  "description": "description",
  "main": "index.js",
  "scripts": {
    "test": "Test"
  },
  "author": "name of author",
  "license": "ISC"
}
```

## Instalación de Jest
Jest es una herramienta o Framework de testeo muy práctica en Javascript, suele usarse en proyectos usando Node, React, Angular y Vue. En éste caso será práctico pues lo usaremos en React, aunque por ahora en el Backend

La instalación es simple, es solo de ejecutar éste comando:

```bash
npm install jest --save-dev #Se ejecuta así para que solo funcione en desarrollo y no en producción
```

Una vez instalado en el backend, podemos crear un folder llamado tests, ahora, dentro podemos hacer varios archivos de testeo, por ejemplo: 

```JS
// example.test.js
const sum = (a, b) => a + b;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Una vez creado el archivo, y colocado la función dentro, con test, expect y toBe, podemos
checar los testeos, simplemente tenemos que ejecutar nuestro comando test, de ésta manera, eso si, debemos de estar en el directorio de pruebas

```bash
npm test
```

Como otro detalle, puede que tengamos que hacer configuraciones personalizadas según lo que deseemos (setear paths, hacer modulos falsos, o modificar el ambiente (env)). Para ésto solo es necesario crear un archivo jest.config.js, un ejemplo:

```JS
module.exports = {
    testEnvironment: 'node'
}
```

Por último, ya que usamos create-react-app, una de las dependencias que viene preinstaladas es el jest, así que también podemos darle uso a éste, para tomar en consideración. El método de chequeo es similar, se crea en el archivo src un folder de testeos, se coloca un archivo:

```JS
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

Y en el directorio de nuestro frontend ejecutamos

```bash
npm test
```
