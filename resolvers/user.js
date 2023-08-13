const User = require('../models/user');
const axios = require('axios');
const { ApolloError } = require('apollo-server-express');
const { signToken, verifyToken } = require('../utils');

const googleApi = 'https://www.googleapis.com/oauth2/v1/userinfo';
const naverApi = 'https://nid.naver.com/oauth2.0/token';

async function getGoogleUserInfo(accessToken) {
  try {
    const response = await axios.get(`${googleApi}?access_token=${accessToken}`);
    return response.data;
  } catch (error) { return error.response.data; }
}

async function getNaverUserInfo(code) {
  const { NAVER_CLIENT_ID, NAVER_SECRET, NAVER_REDIRECT_URL } = process.env;
  try {
    const response = await axios.get(`${naverApi}?grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_SECRET}&redirect_uri=${NAVER_REDIRECT_URL}&code=${code}`);
    if (response.data.error) { return response.data; }
    const token = response.data.access_token;
    const naverResponse = await axios.get('https://openapi.naver.com/v1/nid/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return naverResponse.data.response;
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
    async users(_, __) {
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
    async signIn(_, args) {
      const { code, provider } = args;
      let data;
      try {
        if (!provider || provider === 'google') {
          data = await getGoogleUserInfo(code);
          if (!data) { return; }
          if (data.error) { onErrorGoogle(data.error); }
        } else if (provider === 'naver') {
          data = await getNaverUserInfo(code);
          if (!data) { return; }
          if (data.error) { throw new ApolloError(data.error_description, 1001, {}); }
        }
        if (!data.email) { return; }
        const user = await User.findOne({ email: data.email });
        return {
          user,
          token: user && signToken({ userId: user._id }),
          info: { ...data, provider: provider || 'google' },
        };
      } catch (error) { throw error; }
    },

    async signInTest(_, args) {
      const { token } = args;
      try {
        const data = verifyToken(token);
        const { userId } = data;
        if (!userId) { return null; }

        const user = await User.findById(userId);
        return {
          user,
          token: user ? signToken({ userId: user._id }) : null,
        };
      } catch (error) { throw error; }
    },

    async signUp(_, args) {
      const { code, provider } = args;
      let data;
      try {
        if (!provider || provider === 'google') {
          data = await getGoogleUserInfo(code);
          if (data && data.error) { onErrorGoogle(data.error); }
        } else if (provider === 'naver') {
          data = await getNaverUserInfo(code);
          if (data && data.error) { throw new ApolloError(data.error_description, 1001, {}); }
        }
        if (!data) { return; }

        const { id: providerId, email, name, picture: image } = data;
        const findUser = await User.findOne({ email });
        if (findUser) { throw new ApolloError('Already SignUp', 1001, {}); }
        const user = new User({ name, email, provider: provider || 'google', providerId, image });
        const result = await user.save();
        return result;
      } catch (error) { throw error; }
    },

    async providerSignUp(_, args) {
      try {
        const { id: providerId, email, name, picture: image, provider } = args.info;
        const user = new User({ name, email, provider, providerId, image });
        const result = await user.save();
        return result;
      } catch (error) { throw error; }
    },

    async withdraw(_, args) {
      try {
        const result = await User.deleteOne({ _id: args.id });
        return result.deletedCount === 1;
      } catch (error) { throw error; }
    },
  },
};

module.exports = userResolvers;