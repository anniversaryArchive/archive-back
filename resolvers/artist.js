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
    async artist (_, args) {
      try {
        const artist = await Artist.findOne({ _id: args.id });
        return artist;
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
    async updateArtist (_, args) {
      try {
        const updateDoc = { $set: { ... args.input, updatedAt: Date.now() } };
        await Artist.updateOne({ _id: args.id }, updateDoc);
        const artist = await Artist.findOne({ _id: args.id });
        return artist;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async patchArtist (_, args) {
      try {
        const updateDoc = { $set: { ... args.input, updatedAt: Date.now() } };
        const result = await Artist.updateOne({ _id: args.id }, updateDoc);
        return result.modifiedCount === 1;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async removeArtist (_, args) {
      try {
        const result = await Artist.deleteOne({ _id: args.id });
        return result.deletedCount === 1;
      } catch (error) {
        throw error;
      }
    },
  }
}

module.exports = artistResolvers;
