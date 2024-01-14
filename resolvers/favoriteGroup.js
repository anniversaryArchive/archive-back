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

    async updateFavoriteGroupsInArchive(_, args, context) {
      const { archive, favoriteGroups } = args;
      try {
        const user = getUserId(context);
        const orgFavoriteGroupList = await FavoriteGroup.find({ user, archives: { $in: [archive] } }); // 기존 해당 archive와 연결된 favoriteGroup List

        const newFavoriteGroupIds = [...favoriteGroups]; // 새로 추가된 FavoriteGroup ID list
        const removeArchiveFavoriteGroupIDs = []; // 제거된 FavoriteGroup ID list

        for (const favoriteGroup of orgFavoriteGroupList) {
          // 새로운 favoriteGroupIds에 있는 지 확인
          // 있으면 newFavoriteGroupIds 에서 splice 해준다. (새로 추가된 것이 아니므로)
          const foundIndex = newFavoriteGroupIds.findIndex(id => id === favoriteGroup._id.toString());
          if (foundIndex > -1) {
            newFavoriteGroupIds.splice(foundIndex, 1);
          } else {
            // 없으면 removeArchiveFavoriteGroupIDs 에 push 해준다. (제거해주어야 하므로)
            removeArchiveFavoriteGroupIDs.push(favoriteGroup._id);
          }
        }

        // 기존에 연결되어있었는데 제거된 FavoriteGroup, 해당 archive를 pull해준다.
        await FavoriteGroup.updateMany(
          { _id: { $in: removeArchiveFavoriteGroupIDs } },
          { $pull: { archives: archive } },
        );
        // 기존에 없었는데 추가된 FavoriteGroup, 해당 archive를 push해준다.
        await FavoriteGroup.updateMany({ _id: { $in: newFavoriteGroupIds } }, { $push: { archives: archive } });

        return await FavoriteGroup.find({ user, archives: { $in: [archive] } });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
};

module.exports = favoriteGroupResolvers;
