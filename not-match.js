const source = require('./bookmarks')
const dictionary = require('./dictionary')
const bookmarksWithComment = require('./lib/bookmarks-with-comment')
const createMapBaseOnDictionary = require('./lib/create-map-base-on-dictionary')

// コメントの無いブックマークを削る
const bookmarks = bookmarksWithComment(source)
const summary = createMapBaseOnDictionary(bookmarks, dictionary)

// どこにも属して居ないコメント
let notMach = bookmarks
for (story of summary.values()) {
  notMach = notMach.filter(bookmark => !story.map(s => s[0])
    .includes(bookmark[0]))
}

console.log(notMach)
