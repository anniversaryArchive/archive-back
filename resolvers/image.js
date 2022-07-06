const Image = require('../models/image');

const imageResolvers = {
  Query: {
    async images (_, __) {
      try {
        return await Image.find({});
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async image (_, args) {
      try {
        const image = await Image.findById(args.id);
        return image;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
};

module.exports = imageResolvers;
