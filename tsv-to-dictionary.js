const fs = require('fs')
const rs = fs.createReadStream('./keywordlist_furigana_utf8.csv')
const readline = require('readline')

const rl = readline.createInterface(rs, {})
const buffer = []
rl.on('line', (line) => buffer.push([line.split('\t')[1]]))
rl.on('close', () => console.log(JSON.stringify(buffer, null, 2)))
