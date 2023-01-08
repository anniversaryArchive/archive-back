const groupResolvers = require('./group');
const artistResolvers = require('./artist');
const archiveResolvers = require('./archive');
const fileResolvers = require('./file');

const resolvers = {
  Group: groupResolvers.Group,
  Artist: artistResolvers.Artist,
  Query: {
    ... groupResolvers.Query,
    ... artistResolvers.Query,
    ... archiveResolvers.Query,
    ... fileResolvers.Query,
  },
  Mutation: {
    ... groupResolvers.Mutation,
    ... artistResolvers.Mutation,
    ... archiveResolvers.Mutation,
  }
};

module.exports = resolvers;