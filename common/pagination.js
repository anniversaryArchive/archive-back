exports.getFindDoc = function (filter) {
  if (!filter) {
    return {};
  }
  const { fields, q, flds } = filter;

  const findDoc = {};
  if (fields && q) {
    findDoc["$or"] = fields.map((field) => {
      return { [field]: { $regex: q } };
    });
  }

  if (flds) {
    for (const key of Object.keys(flds)) {
      if (Array.isArray(flds[key])) {
        findDoc[key] = { $in: flds[key] };
      } else {
        findDoc[key] = flds[key];
      }
    }
  }
  return findDoc;
};
