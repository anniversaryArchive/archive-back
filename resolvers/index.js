const { groupResolvers } = require('./group');
const { artistResolvers } = require('./artist');
const archiveResolvers = require('./archive');
const fileResolvers = require('./file');
const favoriteResolvers = require('./favorite');
const favoriteGroupResolvers = require('./favoriteGroup');
const userResolvers = require('./user');
const communicationBoardResolvers = require('./communicationBoard');
const { ObjectScalarType } = require('./object');

const resolvers = {
  Object: ObjectScalarType,
  Group: groupResolvers.Group,
  Artist: artistResolvers.Artist,
  Archive: archiveResolvers.Archive,
  Favorite: favoriteResolvers.Favorite,
  FavoriteGroup: favoriteGroupResolvers.FavoriteGroup,
  CommunicationBoard: communicationBoardResolvers.CommunicationBoard,
  Query: {
    ...groupResolvers.Query,
    ...artistResolvers.Query,
    ...archiveResolvers.Query,
    ...fileResolvers.Query,
    ...favoriteResolvers.Query,
    ...favoriteGroupResolvers.Query,
    ...userResolvers.Query,
    ...communicationBoardResolvers.Query,
  },
  Mutation: {
    ...groupResolvers.Mutation,
    ...artistResolvers.Mutation,
    ...archiveResolvers.Mutation,
    ...favoriteResolvers.Mutation,
    ...favoriteGroupResolvers.Mutation,
    ...userResolvers.Mutation,
    ...communicationBoardResolvers.Mutation,
  },
};

module.exports = resolvers;
