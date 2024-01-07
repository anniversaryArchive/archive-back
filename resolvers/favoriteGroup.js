const ObjectId = require('mongodb').ObjectID;

const FavoriteGroup = require('../models/favoriteGroup');
const Archive = require('../models/archive');

const { getUserId } = require('../utils');

// 생성한 유저와 같은 유저인지 체크
async function checkAuthor(id, user) {
  try {
    const favoriteGroup = await FavoriteGroup.findById(id);
    if (!favoriteGroup) return null;
    if (String(favoriteGroup.user) !== user) {
      throw new ApolloError('This user is not an user.', 403, {});
    }
  } catch (error) {
    throw error;
  }
}

const favoriteGroupResolvers = {
  Query: {
    async FavoriteGroupList(_, __, context) {
      const user = getUserId(context);
      try {
        const favoriteGroupList = await FavoriteGroup.find({ user });
        return favoriteGroupList;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async FavoriteGroup(_, args) {
      try {
        const favorite = await FavoriteGroup.findById(args.id);
        return favorite;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },

  FavoriteGroup: {
    async archives(_, __) {
      try {
        const archives = await Archive.find({ _id: { $in: _.archives } });
        return archives;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },

  Mutation: {
    async createFavoriteGroup(_, args, context) {
      try {
        const user = getUserId(context);
        const favoriteGroup = new FavoriteGroup({ ...args.input, user });
        const result = await favoriteGroup.save();
        return result;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async addArchiveInFavoriteGroup(_, args, context) {
      const { id, archive } = args;
      try {
        await checkAuthor(id, getUserId(context));

        const favoriteGroup = await FavoriteGroup.findById(id);
        const archives = favoriteGroup.archives;

        if (archives.findIndex(id => id === archive.ObjectID) > -1) return true;
        archives.push(archive);
        const updateDoc = { $set: { archives, updateAt: Date.now() } };
        const result = await FavoriteGroup.updateOne({ _id: id }, updateDoc);
        return result.modifiedCount === 1;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async removeArchiveInFavoriteGroup(_, args, context) {
      const { id, archive } = args;
      try {
        await checkAuthor(id, getUserId(context));

        const favoriteGroup = await FavoriteGroup.findById(id);
        const archives = [...favoriteGroup.archives];

        const index = archives.findIndex(id => String(id) === String(archive));
        if (index === -1) return true;

        archives.splice(index, 1);
        const updateDoc = { $set: { archives, updateAt: Date.now() } };
        const result = await FavoriteGroup.updateOne({ _id: id }, updateDoc);
        return result.modifiedCount === 1;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async updateArchives(_, args, context) {
      const { id, archives } = args;
      try {
        await checkAuthor(id, getUserId(context));
        const updateDoc = { $set: { archives, updateAt: Date.now() } };
        const result = await FavoriteGroup.updateOne({ _id: id }, updateDoc);
        return result.modifiedCount === 1;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
};

module.exports = favoriteGroupResolvers;
