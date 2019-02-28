const path = require('path');
const fs = require('fs');
const markdownLinkExtractor = require('markdown-link-extractor');
const fetch = require('node-fetch');

//module.exports = {

const files = (process.argv[2]);

function checkmd(file) {
    let fileabs = path.resolve(file);
    return new Promise((resolve, reject) => {
        const ext = path.extname(fileabs);
        if (ext === '.md')
            return resolve(fs.readFileSync(fileabs).toString());
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

//para el caso de directorio 

// function readDirFiles (user) {
//     return new Promise((resolve, reject) => {
//         const userabs = path.resolve(user);
//         const filemd = path.extname(userabs);
//         const stats = fs.statSync(userabs)


//         if(stats.isFile() === true && filemd === '.md'){
//             return resolve( new Promise ((res,reject) => {
//                 return res (markdownLinkExtractor(userabs))
//             }))
//         }else if(stats.isDirectory() === true){
//             return resolve (fs.readdirSync(userabs).toString()); 
//         }   
//     })
// }

// readDirFiles(process.argv[2])
// .then(res => {
//     console.log(res)
// });
// //}

//main.js

    // .then(files => {
    //     //es un arreglo de promesas
    //     return Promise.all(files)
    // })
    // .then( linksvalidated => {
    //     //mostrar los links validated en un objeto
    //     linksvalidated.forEach(item => {
    //         console.log(item.link, item.validate);
    //     });
    // })
    // .catch(error => {
    //     return console.log(error);
    // })


// const validateStatus = (arrLinks) => {
//     return new Promise ((resolve,r4eject) =>{
//         const checks = arrLinks.map( link => {
//             return validateLink(link)
//         })
//     })
//     Promise.all(checks).then(res => {
//         resolve(console.log(res))
//     })
// }

   