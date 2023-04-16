const groupResolvers = require('./group');
const artistResolvers = require('./artist');
const archiveResolvers = require('./archive');
const fileResolvers = require('./file');
const favoriteResolvers = require('./favorite');
const { ObjectScalarType } = require('./object');

const resolvers = {
  Object: ObjectScalarType,
  Group: groupResolvers.Group,
  Artist: artistResolvers.Artist,
  Archive: archiveResolvers.Archive,
  Favorite: favoriteResolvers.Favorite,
  Query: {
    ... groupResolvers.Query,
    ... artistResolvers.Query,
    ... archiveResolvers.Query,
    ... fileResolvers.Query,
    ... favoriteResolvers.Query,
  },
  Mutation: {
    ... groupResolvers.Mutation,
    ... artistResolvers.Mutation,
    ... archiveResolvers.Mutation,
    ... favoriteResolvers.Mutation,
  }
};

module.exports = resolvers;