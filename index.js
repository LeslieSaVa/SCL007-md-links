//#!/usr/bin/env node 

const mdLinks = require('./main.js');
const path = require ('path');

// module.exports = () => {
//   // ...
// };
module.exports = mdLinks;

if(require.main === module){

  let opciones = [];
  let camino = process.argv;
  let anaPaula;

  //guarda las opciones para que lea lo que el usuario ingresa en la terminal 

  for(let i=2; i< camino.length; i++){
    if( camino[i].indexOf('--') !== -1){
      opciones.push(camino[i])
    }else{
      anaPaula = process.argv[i];
    }
  }

  mdLinks(anaPaula, options = {validate:true})
  .then(data => {
    if(opciones.indexOf('--validate') !== -1){
      for(let i=0; i<data.length; i++){
        console.log(data[i].href, data[i].validate);
      }
    }
    if(opciones.indexOf('--stats') !== -1){
      const total = data.length;
      const totalOK = data.filter(elem => {
        return elem.validate === 'OK' 
      }).length 
      const brokenelem = total - totalOK
      console.log('links totales:',total,'\n','links OK:',totalOK,'\n','links rotos:',brokenelem);
    }

  });
}

// mdLinks(process.argv[2], {validate:true})
// .then(console.log);


// module.exports = () => {

// };

//index.js: Desde este archivo debes exportar una función (mdLinks).

