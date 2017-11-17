const collect = require('./collect')

// Dictionaryの（最初の）キーワードをキーとしたMapを返す。
module.exports = function(bookmarks, dictionary) {
  return bookmarks
    .reduce(
      (map, bookmark) => dictionary
      .reduce((map, keywords) => collect(map, bookmark, keywords), map),
      new Map()
    )
}
