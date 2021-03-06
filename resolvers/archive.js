const Archive = require('../models/archive');

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
    async updateArchive (_, args) {
      const defaultValue = { lat: 0.0, lng: 0.0, archiveName: '', themeName: '', organizer: '', address: '', phoneNumber: null, link: null };
      try {
        const updateValue = Object.assign(defaultValue, args.input);
        const updateDoc = { $set: updateValue };
        const result = await Archive.updateOne({ _id: args.id }, updateDoc);
        return result.modifiedCount === 1;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async patchArchive (_, args) {
      try {
        const updateDoc = { $set: args.input };
        const result = await Archive.updateOne({ _id: args.id }, updateDoc);
        return result.modifiedCount === 1;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
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
