const source = require('./bookmarks')
const dictionary = require('./dictionary')
const bookmarksWithComment = require('./lib/bookmarks-with-comment')
const createMapBaseOnDictionary = require('./lib/create-map-base-on-dictionary')

// コメントの無いブックマークを削る
const bookmarks = bookmarksWithComment(source)
const summary = createMapBaseOnDictionary(bookmarks, dictionary)

// コメント数でソート
const sorted = []
for ([name, comments] of summary.entries()) {
  sorted.push([name, comments.length])
}
sorted.sort((a, b) => {
  if (b[1] - a[1] !== 0) {
    return b[1] - a[1]
  }

  if (a[0] > b[0]) {
    return 1;
  } else if (a[0] < b[0]) {
    return -1;
  } else {
    return 0;
  }
})

// N票
const n = process.argv[2] || 1
const top = sorted
  .filter(s => s[1] == n)

for (const [keyword] of top) {
  console.log(keyword, '---------------\n   ', summary.get(keyword).map(c => c[1]));
}
