module.exports = function(map, bookmark, keywords) {
  return keywords
    .reduce(
      (map, k) => collectBookmarkHasKeyword(map, bookmark, k, keywords[0]),
      map
    )
}

function collectBookmarkHasKeyword(map, bookmark, keyword, name) {
  if (bookmark[1].includes(keyword)) {
    const container = map.get(name) || []

    // 同一ユーザのコメントに複数のキーワードが含まれていると二回検出される。
    // すでに登録済みなら除外する。
    if (container.filter(e => e[0] === bookmark[0])
      .length === 0) {
      container.push(bookmark)

      const newMap = new Map(map)
      newMap.set(name, container)
      return newMap
    }

  }

  return map
}
