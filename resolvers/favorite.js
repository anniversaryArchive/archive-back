const Favorite = require('../models/favorite');
const User = require('../models/user');
const Group = require('../models/group');
const Archive = require('../models/archive');

const { ApolloError } = require('apollo-server-express');

const { getUserId } = require('../utils');
const { getFindDoc } = require('../common/pagination');

const favoriteResolvers = {
  Query: {
    /**
     * Favorite을 Pagination으로 가져온다.
     * - page(Int): 현재 페이지 (0부터 시작)
     * - perPage(Int): 한 페이지에 보여줄 데이터 수 
     * - sortField(String): 데이터 정렬할 필드 이름
     * - sortOrder(Int): 1: 오름차순, -1: 내림차순
     * - filter(FilterOption)
     */
    async FavoritePagination (_, args, context) {
      const userId = getUserId(context);
      const sortField = args.sortField || 'createdAt';
      const sortOrder = args.sortOrder || 1;
      const page = args.page || 0;
      const filter = args.filter || {};
      filter.flds = Object.assign({}, filter.flds, { user: userId });
      const doc = getFindDoc(filter);
      try {
        const data = await Favorite.find(doc)
          .sort({ [sortField]: sortOrder })
          .limit(args.perPage)
          .skip(args.perPage * page)
        const total = await Favorite.find(doc).countDocuments({});
        return { data, total };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async FavoriteGroupList (_, __, context) {
      const user = getUserId(context);
      try {
        const data = await Favorite.find({ user });
        const groupIds = data.map((d) => d.group);
        const groups = await Group.find({ _id: groupIds });
        return groups;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Favorite: {
    async user (_, __) {
      try {
        const user = await User.findById(_.user);
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async archive (_, __) {
      try {
        const archive = await Archive.findById(_.archive);
        return archive;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    async createFavorite (_, args, context) {
      try {
        const { archive } = args;
        const user = getUserId(context);
        const doc = { archive, user };
        const findFavorite = await Favorite.findOne(doc);
        if (findFavorite) { return findFavorite; }
        const findArchive = await Archive.findOne({ _id: archive });
        if (!findArchive) { 
          throw new ApolloError('해당 카페(Archive)를 찾을 수가 없습니다.', 1003, {});
        }
        doc.group = findArchive.group;
        const favorite = new Favorite(doc);
        const result = await favorite.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async removeFavorite (_, args) {
      try {
        const result = await Favorite.deleteOne({ _id: args.id });
        return result.deletedCount === 1;
      } catch (error) {
        throw error;
      }
    },
  }
}

module.exports = favoriteResolvers;
