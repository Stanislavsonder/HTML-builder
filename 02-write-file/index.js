const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})


function input (queryText = '') {
  rl.question(queryText, (answer) => {
    fs.appendFile('02-write-file/text.txt', answer, function(error){
      if(error) throw error
    })
    input()
  })
}
input('What do you want to write to a file? ')





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