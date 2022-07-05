const groupResolvers = require('./group');
const artistResolvers = require('./artist');

const resolvers = {
  Group: groupResolvers.Group,
  Artist: artistResolvers.Artist,
  Query: {
    ... groupResolvers.Query,
    ... artistResolvers.Query,
  },
  Mutation: {
    ... groupResolvers.Mutation,
    ... artistResolvers.Mutation,
  }
};

module.exports = resolvers;