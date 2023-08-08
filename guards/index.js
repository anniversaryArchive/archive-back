const { shield } = require('graphql-shield');
const { isAuthorized } = require('./rules/index.js');

const permissions = shield({
  Query: {
    FavoritePagination: isAuthorized,
    FavoriteGroupList: isAuthorized,
  },
  Mutation: {
    createFavorite: isAuthorized,
    removeFavorite: isAuthorized,
  },
});

module.exports = { permissions };