const Artist = require('../models/artist');
const Group = require('../models/group');
const Image = require('../models/image');

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
        const artist = await Artist.findById(args.id);
        return artist;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async ArtistPagination (_, args) {
      const sortField = args.sortField || 'createdAt';
      const sortOrder = (!args.sortOrder || args.sortOrder === '1') ? 'asc' : 'desc';
      const page = args.page || 0;

      try {
        const artists = await Artist.find()
          .sort({ [sortField]: sortOrder })
          .limit(args.perPage)
          .skip(args.perPage * page)
        const total = await Artist.find().countDocuments({});
        return { data: artists, total };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Artist: {
    async group (_, __) {
      try {
        const group = await Group.findById(_.group);
        return group;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async image (_, __) {
      try {
        const image = await Image.findById(_.image);
        return image;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
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
      const defaultValue = { name: '', updatedAt: Date.now(), debutDate: null, birthDay: null, group: null };
      try {
        const updateValue = Object.assign(defaultValue, args.input);
        const updateDoc = { $set: updateValue };
        const result = await Artist.updateOne({ _id: args.id }, updateDoc);
        return result.modifiedCount === 1;
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
