const readline = require('readline')
const fs = require('fs')


console.log('Hello, stranger')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('What do you want to write to a file? ', (answer) => {

  fs.appendFile('02-write-file/text.txt', answer, function(error){
    if(error) throw error
    console.log('\nSaved.')
  });

  rl.close()
})

rl.on('SIGINT', () => {
  console.log('\nInput exit...')
  rl.close()
})
let text = ''
process.stdin.on('keypress', (c, k) => {
  text += k.sequence
  if (text.includes('exit')) {
    console.log('\nInput exit.')
    rl.close()
  }
});