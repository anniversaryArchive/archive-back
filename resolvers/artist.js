const Artist = require('../models/artist');
const Group = require('../models/group');

const artistResolvers = {
  Query: {
    async artists (_, __) {
      try {
        const artists = await Artist.find();
        return artists;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Artist: {
    async group (_, __) {
      try {
        const group = await Group.findOne({ _id: _.group });
        return group;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    async createArtist (_, args) {
      try {
        const artist = new Artist({ ... args.input });
        const result = await artist.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  }
}

module.exports = artistResolvers;
