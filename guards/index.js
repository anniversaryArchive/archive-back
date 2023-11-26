const { shield } = require('graphql-shield');
const { isAuthorized } = require('./rules/index.js');

const permissions = shield(
  {
    Query: {
      FavoritePagination: isAuthorized,
      GroupListInFavorite: isAuthorized,
    },
    Mutation: {
      createFavorite: isAuthorized,
      removeFavorite: isAuthorized,
      createCommunicationBoard: isAuthorized,
    },
  },
  { allowExternalErrors: true },
);

module.exports = { permissions };
