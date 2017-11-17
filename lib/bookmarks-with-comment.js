module.exports = function(source) {
  return source
    .bookmarks
    .filter(c => c.comment)
    .map(c => [c.user, c.comment])
};
