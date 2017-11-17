const MeCab = new require('mecab-async')
const source = require('./bookmarks')
const bookmarksWithComment = require('./lib/bookmarks-with-comment')

const mecab = new MeCab()
mecab.command = 'mecab -d /usr/local/lib/mecab/dic/mecab-ipadic-neologd'
const bookmarks = bookmarksWithComment(source)
const dictinary = bookmarks
  .map(([id, comment]) => mecab.parseSync(comment))
  .map(result => result
    .filter(r => r[2] === '固有名詞')
    .map(r => r[0]))
  .reduce((ary, elm) => ary.concat(elm), [])
  .filter((x, i, self) => self.indexOf(x) === i)
  .map(r => [r])

console.log(JSON.stringify(dictinary, null, 2));
