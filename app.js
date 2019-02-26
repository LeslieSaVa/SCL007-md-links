const path = require('path');
const fs = require('fs');
const markdownLinkExtractor = require('markdown-link-extractor');
const fetch = require('node-fetch');

//module.exports = {

const files = process.argv[2];

function checkmd(file) {
    return new Promise((resolve, reject) => {
        const ext = path.extname(file);
        if (ext === '.md')
            return resolve(fs.readFileSync(file).toString());
    })
}

checkmd(files)
    .then(data => {
        return markdownLinkExtractor(data)
    })
    .then(linkArr => {
        //me entrega un ARRAY con los links en el archivo
        return [linkArr, (linkArr.map(element => validateLink(element)))]
            //.catch(error =>{ console.log(error)})   
    })
    .then(arr =>{
        Promise.all(arr[1])
        .then(validaciones => {
            for(let i=0; i<arr[0].length; i++){
                console.log(arr[0][i], validaciones[i]);
            } 
        })
 
    })
   
function validateLink(link) {
    return new Promise((resolve,reject) =>{
        fetch(link)
        .then(response => {
            if(response.status === 200){
                return resolve (true)
            }else{
                return resolve (false)
            }
        })
        .catch(err => {
            return resolve(false)
        });
    })
}

// para el caso de directorio 

// function readDirFiles() {
//     const dirListFiles = [];
//     const fileList = [];

//     if(){

//     }
// }
//}