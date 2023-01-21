exports.getFindDoc = function (filter) {
  if (!filter) { return {}; }
  const { fields, q } = filter;
  if (!fields || !q) { return {}; }

  const findDoc = {};
  for (const field of fields) {
    findDoc[field] = { $regex: q };
  }
  return findDoc;
}
