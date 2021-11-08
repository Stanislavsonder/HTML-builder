const fs = require('fs')
const path = require('path')

const projectFolder = path.resolve(__dirname, 'project-dist')
const components = path.resolve(__dirname, 'components')
const stylesFolder = path.resolve(__dirname, 'styles')
const template = path.resolve(__dirname, 'template.html')
const resultHTML = path.resolve(projectFolder, 'index.html')

fs.mkdir(projectFolder,{ recursive: true }, err => {
    if (err) throw err
    replaceTemplate(template, components, resultHTML)
    copyDir(path.resolve(__dirname, 'assets'), path.resolve(projectFolder, 'assets'))
    mergeStyles(path.resolve(projectFolder, 'style.css'), stylesFolder)
})







function replaceTemplate(template, componentsFolder, dest) {

    fs.readFile(template, 'utf8', (err, data) => {
        if (err) throw err
        let page = data
        let promises = []
        let components = new Map()
        fs.readdir(componentsFolder, (err, files) => {
            if (err) throw err
            files.forEach(e=> {
                if (path.extname(path.resolve(componentsFolder, e)) === '.html') {
                    promises.push(new Promise((res, rej) => {
                        fs.readFile(path.resolve(componentsFolder, e), 'utf8', (err, data) => {
                            if (err) rej()
                            components.set(e.split('.').splice(0, 1), data)
                            res()
                        })
                    }))
                }
            })
            Promise.all(promises)
                .then(() => {
                    for ([key, value] of components) {
                        page = page.replace(`{{${key[0]}}}`, value)
                    }
                    fs.writeFile(dest, page, (err) => {
                        if (err) throw err
                    })
                })
                .catch(err => console.error(err))
        })
    })

}
function copyDir(from, to){
    const fs = require('fs');
    const path = require('path');
    fs.mkdir(to,{ recursive: true }, (err) => {
        if (err) throw err
        fs.readdir(path.resolve(from), function (error, files) {
            if (error) throw error
            files.forEach(file => {
                 fs.stat(path.resolve(from, file), (err, stat) => {
                     if (!stat.isDirectory()) {
                         fs.copyFile(path.resolve(from, file), (path.resolve(to, file)), err => {
                             if(err) throw err
                         })
                     }
                     else copyDir(path.resolve(from, file), path.resolve(to, file))
                 })
            })
        })
    })
}
function mergeStyles (dest, sourceFolder) {
    fs.readdir(sourceFolder, {withFileTypes: true}, (err, files) => {
        if (err) throw err
        let bundle = ''
        let promises = []
        files.forEach(e => {
            if (path.extname(path.resolve(sourceFolder, e.name)).toLowerCase() === '.css') {
                promises.push(new Promise((res, rej) => {
                    fs.readFile(path.resolve(sourceFolder, e.name), 'utf8', function (error, data) {
                        if (error) throw error
                        bundle += data
                        res()
                    })
                }).catch(e => {
                    console.error(e)
                }))
            }
        })
        Promise.all(promises).then(() => {
            fs.writeFile(dest, bundle, (err) => {
                if (err) throw err
            })
        })
    })
}

