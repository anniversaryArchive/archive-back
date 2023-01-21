exports.getFindDoc = function (filter) {
  if (!filter) { return {}; }
  const { fields, q, flds } = filter;
  if (!fields || !q) { return {}; }

  const findDoc = {};
  for (const field of fields) {
    findDoc[field] = { $regex: q };
  }

  if (flds) {
    for (const key of Object.keys(flds)) {
      findDoc[key] = flds[key];
    }
  }
  return findDoc;
}
