function pageFromTotal(totalDocs, docsPerPage) {
  const pageCount = Math.ceil(totalDocs / docsPerPage);
  return pageCount;
}

module.exports = pageFromTotal;
