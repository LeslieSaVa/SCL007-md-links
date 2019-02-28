const path = require('path');
const fs = require('fs');
const markdownLinkExtractor = require('markdown-link-extractor');
const fetch = require('node-fetch');

const userDirection = process.argv[2];



const linkExtractorfromFiles = (arrMdFiles) => {
    const filesMD = fs.readFileSync(arrMdFiles).toString();
    const linksExtract = markdownLinkExtractor(filesMD)
    //console.log(linksExtract);
    return linksExtract;

};

const validateLink = link => new Promise((resolve, reject) => {
    fetch(link)
        .then((response) => {
            if (response.status === 200) {
                return resolve({
                    href: response.url,
                    validate: response.statusText,
                    file: path.resolve(require('path').dirname(require.main.filename), userDirection),
                });    
            }
            return resolve({
                href: response.url,
                validate: response.statusText,
                file: path.resolve(require('path').dirname(require.main.filename), userDirection),
            });
        })
        .catch(err => resolve({
            href: link,
            validate: 'false',
        }));
});

const mdLinks = (userDirection, options = { validate: false }) => new Promise((resolve, reject) => {
    //variable creada para que tomara el parametro validacion en el caso de un directorio
    const option = options;
    const absolutePath = path.resolve(userDirection);
    const directory = fs.statSync(absolutePath);

    if (directory.isFile()) {
        if (path.extname(userDirection) === '.md') {
            if (fs.existsSync(absolutePath) === true) {
                const links = linkExtractorfromFiles(absolutePath);
                const validatePromises = links.map(elem => {
                    if (options.validate) {
                        return validateLink(elem);
                    } else {
                        return {
                            href: elem,
                            file: path.resolve(require('path').dirname(require.main.filename), userDirection),
                        };
                    }
                });
                Promise.all(validatePromises)
                    .then((linkObj) => {
                        resolve(linkObj);
                });
            }
        } else {
            return resolve([]);
        }
    } else if (directory.isDirectory() === true) {
        const filesInDir = fs.readdirSync(userDirection);
        return (Promise.all(filesInDir.map((file) => {
            const files = path.join(absolutePath, file);
            return mdLinks(files, option);
        })))
            .then((arr) => {
                const arrPathFiles = [];
                if (arr.length > 0) {
                    arr.forEach((item) => {
                        if (item) {
                            item.forEach((subitem) => {
                                arrPathFiles.push(subitem);
                            });
                        }
                    });
                }
                return resolve(arrPathFiles);
            });
    } else {
        resolve([]);
    }
});

module.exports = mdLinks;

// mdLinks(userDirection)
// //     // Este then toma el arreglo de promesas cumplidas que retorna de promise all y lo imprime como un objeto con propiedades
//  .then(console.log);
// linksValidated.forEach(item => {
// console.log(item.link, item.validate)
// })
// })

//}
// mdLinks(process.argv[2])




// validate y stat
// agregar path al objeto porque tengo el link pero no se de que archivo viene
// recorrer el linkObj y a cada uno agregarle el path
