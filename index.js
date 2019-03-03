#!/usr/bin/env node

const mdLinks = require('./main.js');

module.exports = mdLinks;

if (require.main === module) {

  let option = [];
  let pathUser = process.argv;
  let path;

  //guarda las option para que lea lo que el usuario ingresa en la terminal 

  for (let i = 2; i < pathUser.length; i++) {
    if (pathUser[i].indexOf('--') !== -1) {
      option.push(pathUser[i])
    } else {
      path = process.argv[i];
    }
  }

  if (option.indexOf('--validate') !== -1 || option.indexOf('--v') !== -1) {
    mdLinks(path, { validate: true })
      .then(data => {
        console.log(data);
        return data;
      })
      .then(data2 => {
        if (option.indexOf('--stats') !== -1 || option.indexOf('--s') !== -1) {
          const total = data2.length;
          const totalOK = data2.filter(elem => {
            return elem.validate === 'OK'
          }).length
          const brokenelem = total - totalOK
          console.log('links totales:', total, '\n', 'links OK:', totalOK, '\n', 'links rotos:', brokenelem);
        }
      })
  } else {
    mdLinks(path)
      .then(data1 => {
        console.log(data1);
        return data1;
      })
      .then(data3 => {
        if (option.indexOf('--stats') !== -1 || option.indexOf('--s') !== -1) {
          const total = data3.length;
          console.log('links totales:', total, '\n');
        }
      })
  }
}
