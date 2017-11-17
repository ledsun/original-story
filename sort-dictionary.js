const source = require('./bookmarks')
const bookmarksWithComment = require('./lib/bookmarks-with-comment')
const createMapBaseOnDictionary = require('./lib/create-map-base-on-dictionary');
const dictionary = require(process.argv[2])

// コメントの無いブックマークを削る
const bookmarks = bookmarksWithComment(source)
const summary = createMapBaseOnDictionary(bookmarks, dictionary)

// Dictionaryを順位順でソート
const ranking = new Map()
for ([name, comments] of summary.entries()) {
  ranking.set(name, comments.length)
}
hasBookmarks = dictionary
  .filter(keywords => ranking.has(keywords[0]))

hasBookmarks
  .sort((a, b) => {
    if (ranking.get(b[0]) !== ranking.get(a[0])) {
      return ranking.get(b[0]) - ranking.get(a[0])
    }

    // 同順位は名前順ソート
    if (a[0] > b[0]) {
      return 1;
    } else if (a[0] < b[0]) {
      return -1;
    } else {
      return 0;
    }
  })
console.log(JSON.stringify(hasBookmarks, null, 2))
