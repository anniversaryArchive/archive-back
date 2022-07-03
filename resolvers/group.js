const Group = require('../models/group');
const Artist = require('../models/artist');

const groupResolvers = {
  Query: {
    async groups (_, args) {
      try {
        const groups = await Group.find();
        return groups;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
  Group: {
    async artists (_, __) {
      try {
        const artists = await Artist.find({ group: _._id });
        return artists;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
  Mutation: {
    async createGroup (_, args) {
      try {
        const group = new Group({ ... args.input });
        const result = await group.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
}

module.exports = groupResolvers;
