const Archive = require('../models/archive');
const Group = require('../models/group');
const Artist = require('../models/artist');
const File = require('../models/file');
const FavoriteGroup = require('../models/favoriteGroup');
const { getFindDoc } = require('../common/pagination');
const { ApolloError } = require('apollo-server-express');
const { getUserId } = require('../utils');
const { initDate } = require('../common/date');
const { DISTRICTS } = require('../common/district');

function checkArtistOrGroup({ artist, group }) {
  if (!artist && !group) {
    throw new ApolloError('Either artist or group must exist.', 1002, {});
  }
}

const archiveResolvers = {
  Query: {
    async archives(_, __) {
      try {
        const archives = await Archive.find();
        return archives;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async archive(_, args) {
      try {
        const archive = await Archive.findById(args.id);
        return archive;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    /**
     * Archive를 Pagination으로 가져온다.
     * - page(Int): 현재 페이지 (0부터 시작)
     * - perPage(Int): 한 페이지에 보여줄 데이터 수
     * - sortField(String): 데이터 정렬할 필드 이름
     * - sortOrder(Int): 1: 오름차순, -1: 내림차순
     * - filter(FilterOption)
     * - start
     * - end
     */
    async ArchivePagination(_, args) {
      const sortField = args.sortField || 'createdAt';
      const sortOrder = args.sortOrder || 1;
      const page = args.page || 0;
      const doc = getFindDoc(args.filter);

      let { start, end } = args;
      if (end) {
        end = initDate(end);
        doc.startDate = { $lte: end.toISOString() };
      }
      if (start) {
        start = initDate(start);
        doc.endDate = { $gte: start.toISOString() };
      }

      try {
        const archives = await Archive.find(doc)
          .sort({ [sortField]: sortOrder })
          .limit(args.perPage)
          .skip(args.perPage * page);
        const total = await Archive.find(doc).countDocuments({});
        return { data: archives, total };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Archive: {
    async artist(_, __) {
      try {
        const artist = await Artist.findById(_.artist);
        return artist;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async group(_, __) {
      try {
        const group = await Group.findById(_.group);
        return group;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async mainImage(_, __) {
      try {
        const image = await File.findById(_.mainImage);
        return image;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async images(_, __) {
      try {
        const images = await File.find({ _id: { $in: _.images } });
        return images;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async favorite(item, _, context) {
      try {
        const user = getUserId(context);
        const favoriteGroupList = await FavoriteGroup.find({ user, archives: { $in: [item._id] } });
        return favoriteGroupList.length > 0;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async favoriteGroup(item, _, context) {
      try {
        const user = getUserId(context);
        const favoriteGroupList = await FavoriteGroup.find({ user, archives: { $in: [item._id] } });
        return favoriteGroupList;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    // 지역
    district({ districtCode }) {
      districtCode = districtCode || 1;
      return DISTRICTS.find(({ code }) => districtCode === code);
    },
  },
  Mutation: {
    async createArchive(_, args) {
      checkArtistOrGroup(args.input);
      try {
        const districtCode = DISTRICTS.find(({ name }) => args.input.districtName === name).code;
        const archive = new Archive({ ...args.input, districtCode });
        const result = await archive.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async updateArchive(_, args) {
      checkArtistOrGroup(args.input);

      const defaultValue = { updateAt: Date.now(), images: [] };
      for (const field of [
        'name',
        'themeName',
        'artist',
        'group',
        'address',
        'detailAddress',
        'lat',
        'lng',
        'organizer',
        'startDate',
        'endDate',
        'openTime',
        'closeTime',
        'mainImage',
        'phoneNumber',
        'link',
        'districtCode',
      ]) {
        defaultValue[field] = null;
      }
      const districtCode = DISTRICTS.find(({ name }) => args.input.districtName === name).code;

      try {
        const updateDoc = Object.assign(defaultValue, args.input, { districtCode });
        const result = await Archive.updateOne({ _id: args.id }, updateDoc);
        return result.modifiedCount === 1;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async patchArchive(_, args) {
      const updateDoc = { ...args.input, updateAt: Date.now() };
      if (args.input.districtName)
        updateDoc.districtCode = DISTRICTS.find(({ name }) => args.input.districtName === name).code;
      try {
        const updateDoc = { $set: { ...args.input, updateAt: Date.now() } };
        const result = await Archive.updateOne({ _id: args.id }, updateDoc);
        return result.modifiedCount === 1;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async removeArchive(_, args) {
      try {
        const result = await Archive.deleteOne({ _id: args.id });
        return result.deletedCount === 1;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = archiveResolvers;
