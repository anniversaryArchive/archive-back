const User = require('../models/user');
const axios = require('axios');
const { ApolloError } = require('apollo-server-express');
const { signToken } = require('../utils');

const googleApi = 'https://www.googleapis.com/oauth2/v1/userinfo';

async function getGoogleUserInfo(accessToken) {
  try {
    const response = await axios.get(`${googleApi}?access_token=${accessToken}`);
    return response.data;
  } catch (error) { return error.response.data; }
}

function onErrorGoogle(error) {
  const code = error.code;
  switch (code) {
    case 401: throw new ApolloError('Invalid token.', 401, {});
    default: throw new ApolloError('Fail', 500, {});
  }
}

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
          const data = await getGoogleUserInfo(accessToken);
          if (!data) { return; }
          if (data.error) { onErrorGoogle(data.error); }
          const { email } = data;
          const user = await User.findOne({ email });
          return {
            user,
            token: signToken({ userId: user._id }),
          };
        }
      } catch (error) { throw error; }
      return;
    },

    async signUp (_, args) {
      const { accessToken, provider } = args;
      try {
        if (!provider || provider === 'google') {
          const data = await getGoogleUserInfo(accessToken);
          if (!data) { return; }
          if (data.error) { onErrorGoogle(data.error); }
          const { id: providerId, email, name, picture: image } = data;
          const findUser = await User.findOne({ email });
          if (findUser) { throw new ApolloError('Already SignUp', 1001, {}); }
          const user = new User({ name, email, provider: 'google', providerId, image });
          const result = await user.save();
          return result;
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