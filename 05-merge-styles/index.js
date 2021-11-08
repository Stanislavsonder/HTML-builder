const fs = require('fs')
const path = require('path')

const DIR = path.resolve(__dirname, 'styles')
fs.readdir(DIR, { withFileTypes: true } ,  (err, files) => {
    if (err) throw err

    let bundle = ''
    let promises = []
    files.forEach(e=> {
       if(path.extname(path.resolve(DIR, e.name)).toLowerCase() === '.css') {
           promises.push(new Promise((res, rej) => {
               fs.readFile(path.resolve(DIR, e.name), 'utf8', function(error,data) {
                   if (error) throw error
                   bundle+=data
                   res()
               })
           }).catch(e=> {
               console.error(e)
           }))}
    })
    Promise.all(promises).then(()=>{
        fs.writeFile(path.resolve(__dirname, 'project-dist', 'bundle.css'), bundle, (err) => {
            if (err) console.error(err)
        })
    })
})

