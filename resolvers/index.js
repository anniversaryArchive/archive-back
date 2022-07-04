const Group = require('../models/group');

const resolvers = {
  Query: {
    async groups(_, {}){
      try {
        const groups = await Group.find();
        return groups;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

module.exports = resolvers;