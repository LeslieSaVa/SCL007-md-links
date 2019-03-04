# Markdown Links

## Introducción 

`mdLinks` es una libreria que permite extraer los links presentes en un archivo Markdown (.md).Puedes utilizarlo como módulo o requerirlo desde un archivo javascript en tu proyecto. Además indica la ruta del archivo donde se encontró el link y el texto que aparece dentro del link (`<a>`).

## Instalación 

Para instalar el módulo en tu proyecto, debes posicionarte en la carpeta de este e ingresar el siguiente comando en la terminal:

```js
npm install --save https://github.com/LeslieSaVa/SCL007-md-links.git
```
#### `mdLinks(path, options)`

##### mdLinks recibe dos argumentos: 

- `path`: Ruta absoluta o relativa al archivo o directorio. 
- `options`: Un objeto con las siguientes propiedades:
  * `validate`: Booleano que determina si se desea validar los links encontrados.

##### Valor de retorno

La función retorna una promesa (`Promise`) que resuelve  un arreglo
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene las siguientes propiedades:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.
- `validate`: (opcional) OK si el link funciona.

#### Ejemplo

```js
const mdLinks = require("md-links");
mdlink( ['.README'] )
  .then(console.log)

resulta algo como esto:

[ { href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: '/Users/Lesliee/Desktop/Proyecto 4 - MdLinks/SCL007-md-links/README.md' },
  { href: 'https://nodejs.org/',
    text: 'Node.js',
    file: '/Users/Lesliee/Desktop/Proyecto 4 - MdLinks/SCL007-md-links/README.md' },
  { href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
    text: 'md-links',
    file: '/Users/Lesliee/Desktop/Proyecto 4 - MdLinks/SCL007-md-links/README.md' },
  { href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    text: 'Linea de comando CLI',
    file: '/Users/Lesliee/Desktop/Proyecto 4 - MdLinks/SCL007-md-links/README.md' } ]  
```
Si usamos la opción validate:

```js

const mdlinks = require('mdlinks');
mdLinks("./README.md", { validate: true })

[ { href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: '/Users/Lesliee/Desktop/Proyecto 4 - MdLinks/SCL007-md-links/README.md', 
    validate: 'OK'},
  { href: 'https://nodejs.org/',
    text: 'Node.js',
    file: '/Users/Lesliee/Desktop/Proyecto 4 - MdLinks/SCL007-md-links/README.md', 
    validate: 'OK'},
  { href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
    text: 'md-links',
    file: '/Users/Lesliee/Desktop/Proyecto 4 - MdLinks/SCL007-md-links/README.md',
    validate: 'OK' },
  { href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    text: 'Linea de comando CLI',
    file: '/Users/Lesliee/Desktop/Proyecto 4 - MdLinks/SCL007-md-links/README.md',
    validate: 'OK'} ]  
```

### CLI (Command Line Interface - Interfaz de Línea de Comando)

El módulo debe poder ejecutarse de la siguiente manera a través de la terminal.Debemos llamarlo por su nombre mdlinks, indicando la ruta del archivo o archivos que queremos analizar y luego las opciones:

`mdlinks <path-to-file> [options]`

- `path`: Ruta absoluta o relativa al archivo o directorio. 

- `options`: Un objeto con las siguientes propiedades:
  * `--v` o `--validate` : estas opciones validan si el link esta activo o no.
  * `--s` o `--stats`: estas opciones muestran estadísticas de los links(activos y rotos) Se pueden combinar las dos opciones y mostrar la cantidad de links totales, cuantos están rotos y cuantos links están OK.

#### Modo de uso en la terminal en el caso de no ingresar opciones

Por ejemplo:

ingresamos en la terminal:

```sh
mdlinks README.md
```
obtenemos:

```sh

[ { href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
    text: 'md-links',
    file: '/Users/Lesliee/Desktop/Proyecto 4 - MdLinks/SCL007-md-links/README.md' },
  { href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    text: 'Linea de comando CLI',
    file: '/Users/Lesliee/Desktop/Proyecto 4 - MdLinks/SCL007-md-links/README.md'} ] 
```

#### Options

##### `--validate`

Si pasamos la opción `--validate` o `--v`, el módulo debe hacer una petición HTTP para averiguar si el link funciona o no. Si el link resulta en una redirección a una URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

ingresamos en la terminal:

```sh
mdlinks README.md --validate o 
mdlinks README.md --v 
```
y obtenemos: 

```sh

[ { href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
    text: 'md-links',
    file: '/Users/Lesliee/Desktop/Proyecto 4 - MdLinks/SCL007-md-links/README.md',
    validate: 'OK' },
  { href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    text: 'Linea de comando CLI',
    file: '/Users/Lesliee/Desktop/Proyecto 4 - MdLinks/SCL007-md-links/README.md',
    validate: 'OK'} ] 
```

Vemos que el _output_ en este caso incluye la propiedad `validate : OK` o `false` en cada link.

##### `--stats`

Si pasamos la opción `--stats` o `--s` el output (salida) será un texto con estadísticas básicas sobre los links.

ingresamos en la terminal:

```sh
mdlinks README.md --stats o 
mdlinks README.md --s 
```
y obtenemos:

```sh
[ { href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
    text: 'md-links',
    file: '/Users/Lesliee/Desktop/Proyecto 4 - MdLinks/SCL007-md-links/README.md' },
  { href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    text: 'Linea de comando CLI',
    file: '/Users/Lesliee/Desktop/Proyecto 4 - MdLinks/SCL007-md-links/README.md' } ] 

links totales: 2
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que necesiten de los resultados de la validación.

ingresamos en la terminal:

```sh
mdlinks README.md --validate --stats o 
mdlinks README.md --v --s
```
y obtenemos:

```sh

[ { href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
    text: 'md-links',
    file: '/Users/Lesliee/Desktop/Proyecto 4 - MdLinks/SCL007-md-links/README.md',
    validate: 'OK' },
  { href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    text: 'Linea de comando CLI',
    file: '/Users/Lesliee/Desktop/Proyecto 4 - MdLinks/SCL007-md-links/README.md',
    validate: 'OK'} ] 

links totales: 2
links OK: 2
links rotos: 0

```

## Cuando mdLinks retorna un array vacío 

`mdLinks` puede retornar una promesa con un resolve de arreglo vacio en los siguientes casos:

- La ruta ingresada no corresponde a un archivo tipo markdown (.md).
- La ruta ingresada no contiene archivos del tipo markdown.
- La ruta ingresada no es válida.


 








