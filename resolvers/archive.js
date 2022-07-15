const Archive = require('../models/archive');
const Image = require('../models/image');

const archiveResolvers = {
  Query: {
    async archives (_, __) {
      try {
        const archives = await Archive.find();
        return archives;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async archive (_, args) {
      try {
        const archive = await Archive.findById(args.id);
        return archive;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    async createArchive (_, args) {
      try {
        const archive = new Archive({ ... args.input });
        const result = await archive.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // async updateArchive (_, args) {
    //   const defaultValue = { name: '', updatedAt: Date.now(), debutDate: null, birthDay: null, group: null };
    //   try {
    //     const updateValue = Object.assign(defaultValue, args.input);
    //     const updateDoc = { $set: updateValue };
    //     const result = await Artist.updateOne({ _id: args.id }, updateDoc);
    //     return result.modifiedCount === 1;
    //   } catch (error) {
    //     console.log(error);
    //     throw error;
    //   }
    // },
    // async patchArchive (_, args) {
    //   try {
    //     const updateDoc = { $set: { ... args.input, updatedAt: Date.now() } };
    //     const result = await Artist.updateOne({ _id: args.id }, updateDoc);
    //     return result.modifiedCount === 1;
    //   } catch (error) {
    //     console.log(error);
    //     throw error;
    //   }
    // },
    async removeArchive (_, args) {
      try {
        const result = await Archive.deleteOne({ _id: args.id });
        return result.deletedCount === 1;
      } catch (error) {
        throw error;
      }
    },
  }
}

module.exports = archiveResolvers;
