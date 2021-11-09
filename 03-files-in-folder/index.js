let fs = require('fs');
let path = require('path');


fs.readdir(path.resolve(__dirname, 'secret-folder'), { withFileTypes: true } , function (err, files) {
  if (err) {
    console.error('Could not list the directory.');
  }
  else {


    files.forEach(function (file) {
      if (!file.isDirectory()) {
        fs.stat(path.resolve(__dirname, 'secret-folder', file.name), (err, stats) => {
          if (err) {
            console.error('Could not list the directory.');
          }
          else {
            const fileName = path.parse(file.name)
            console.log(fileName.name + ' - ' + fileName.ext.replace('.','') + ' - ' + stats.size + 'B');
          }
        });
      }
    });
  }
});