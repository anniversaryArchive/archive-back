
const { rule } = require('graphql-shield');
const { verifyToken } = require('../../utils/index.js');

const isAuthorized = rule()(async (_, __, ctx, ___) => {
  const { Authorization } = ctx.request.headers;
  if (!Authorization) { return false; }
  const token = Authorization.replace('Bearer', '').trim();
  const { userId } = verifyToken(token);
  return !!userId;
});

module.exports = { isAuthorized };
