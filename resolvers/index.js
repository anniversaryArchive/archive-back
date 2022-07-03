const Group = require('../models/group');

const resolvers = {
  Query: {
    async groups(_, __) {
      try {
        const groups = await Group.find();
        return groups;
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
};

module.exports = resolvers;