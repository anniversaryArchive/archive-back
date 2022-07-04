const groupResolvers = require('./group');
const artistResolvers = require('./artist');
const imageResolvers = require('./image');

const resolvers = {
  Group: groupResolvers.Group,
  Artist: artistResolvers.Artist,
  Query: {
    ... groupResolvers.Query,
    ... artistResolvers.Query,
    ... imageResolvers.Query,
  },
  Mutation: {
    ... groupResolvers.Mutation,
    ... artistResolvers.Mutation,
  }
};

module.exports = resolvers;