const Group = require('../models/group');
const Artist = require('../models/artist');

const groupResolvers = {
  Query: {
    async groups (_, __) {
      try {
        const groups = await Group.find();
        return groups;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async group (_, args) {
      try {
        const group = await Group.findOne({ _id: args.id });
        return group;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
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
    },
    async updateGroup (_, args) {
      try {
        await Group.updateOne({ _id: args.id }, { $set: { ... args.input, updatedAt: Date.now() } });
        const group = await Group.findOne({ _id: args.id });
        return group;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async patchGroup (_, args) {
      try {
        const result = await Group.updateOne({ _id: args.id }, { $set: { ... args.input, updatedAt: Date.now() } });
        return result.modifiedCount === 1;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async removeGroup (_, args) {
      try {
        const result = await Group.deleteOne({ _id: args.id });
        return result.deletedCount === 1;
      } catch (error) {
        throw error;
      }
    },
  }
}

module.exports = groupResolvers;
