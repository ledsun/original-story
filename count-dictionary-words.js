const dictionary = require(process.argv[2])

console.log(dictionary.reduce((arr, elm) => arr.concat(elm), []).length)
