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
            const fileName = file.name.split('.');
            console.log(fileName.slice(fileName.length - 2, -1)[0] + ' - ' + fileName.slice(-1).at(0) + ' - ' + Math.round(stats.size/1000 )+ 'KB');
          }
        });
      }
    });
  }
});