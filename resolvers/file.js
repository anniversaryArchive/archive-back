const File = require('../models/file');

const fileResolvers = {
  Query: {
    async files (_, __) {
      try {
        return await File.find({});
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async file (_, args) {
      try {
        const file = await File.findById(args.id);
        return file;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
};

module.exports = fileResolvers;
