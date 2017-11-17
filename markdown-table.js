const handlebars = require('handlebars');
const source = require('./bookmarks')
const dictionary = require('./dictionary')
const bookmarksWithComment = require('./lib/bookmarks-with-comment')
const createMapBaseOnDictionary = require('./lib/create-map-base-on-dictionary')

// コメントの無いブックマークを削る
const bookmarks = bookmarksWithComment(source)
const summary = createMapBaseOnDictionary(bookmarks, dictionary)

// 配列にする
const array = []
for ([name, comments] of summary.entries()) {
  array.push([name, comments, comments.join('<br>')])
}
// コメント数でソート
array.sort((a, b) => {
  if (b[1].length - a[1].length !== 0) {
    return b[1].length - a[1].length
  }

  if (a[0] > b[0]) {
    return 1;
  } else if (a[0] < b[0]) {
    return -1;
  } else {
    return 0;
  }
})

// コメント数のみ
const formatter = handlebars.compile(`
|名前 | 票数 |
|:-----------|------------:|
{{#each this}}
| {{[0]}}       |{{[1].length}}        |
{{/each}}
  `)
console.log(formatter(array))

// コメント一覧
const formatter2 = handlebars.compile(`
{{#each this}}
### {{[0]}}

|ID          | コメント     |
|:-----------|:------------|
{{#each [1]}}
| {{[0]}}    |{{[1]}}      |
{{/each}}

{{/each}}
  `)
console.log(formatter2(array))
