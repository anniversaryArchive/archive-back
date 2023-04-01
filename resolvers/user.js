const User = require('../models/user');
const axios = require('axios');
const { ApolloError } = require('apollo-server-express');

const userResolvers = {
  Query: {
    async users (_, __) {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    async signIn (_, args) {
      const { accessToken, provider } = args;
      try {
        if (!provider || provider === 'google') {
          const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`);
          if (response.data) {
            const { email } = response.data;
            const user = await User.findOne({ email });
            return user;
          }
        }
      } catch (error) { throw error; }
      return;
    },

    async signUp (_, args) {
      const { accessToken, provider } = args;
      try {
        if (!provider || provider === 'google') {
          const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`);
          if (response.data) {
            const { id: providerId, email, name, picture: image } = response.data;
            const findUser = await User.findOne({ email });
            if (findUser) {
              throw new ApolloError('Already SignUp', 1001, {});
            }
            const user = new User({ name, email, provider: 'google', providerId, image, token: accessToken });
            const result = await user.save();
            return result;
          }
        }
      } catch (error) { throw error; }
      return;
    },
    async withdraw (_, args) {
      try {
        const result = await User.deleteOne({ _id: args.id });
        return result.deletedCount === 1;
      } catch (error) { throw error; }
    },
  },
};

module.exports = userResolvers;