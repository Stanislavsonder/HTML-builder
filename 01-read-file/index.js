const fs = require('fs')
const path = require('path')

const rs = new fs.ReadStream(path.resolve(__dirname, 'text.txt'))
rs.on('readable', () => {
  let data = rs.read()
  if (data) {
    console.log(data.toString())
  }
})
