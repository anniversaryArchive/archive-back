const groupResolvers = require('./group');
const artistResolvers = require('./artist');
const archiveResolvers = require('./archive');
const imageResolvers = require('./image');

const resolvers = {
  Group: groupResolvers.Group,
  Artist: artistResolvers.Artist,
  Query: {
    ... groupResolvers.Query,
    ... artistResolvers.Query,
    ... archiveResolvers.Query,
    ... imageResolvers.Query,
  },
  Mutation: {
    ... groupResolvers.Mutation,
    ... artistResolvers.Mutation,
    ... archiveResolvers.Mutation,
  }
};

module.exports = resolvers;