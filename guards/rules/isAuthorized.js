
const { rule } = require('graphql-shield');
const { verifyToken } = require('../../utils/index.js');

const isAuthorized = rule()(async (_, __, ctx, ___) => {
  const { authorization } = ctx.request.headers;
  if (!authorization) { return false; }
  const token = authorization.replace('Bearer', '').trim();
  const { userId } = verifyToken(token);
  return !!userId;
});

module.exports = { isAuthorized };
