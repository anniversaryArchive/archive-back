const { shield } = require('graphql-shield');
const { isAuthorized } = require('./rules/index.js');

const permissions = shield({
  Query: {
    users: isAuthorized,
  },
  Mutation: {
  },
});

module.exports = { permissions };