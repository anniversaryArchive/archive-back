const Archive = require('../models/archive');
const Group = require('../models/group');
const Artist = require('../models/artist');
const File = require('../models/file')
const { getFindDoc } = require('../common/pagination');
const { ApolloError } = require('apollo-server-express');

function checkArtistOrGroup ({ artist, group }) {
  if (!artist && !group) {
    throw new ApolloError('Either artist or group must exist.', 1002, {});
  }
}

function initDate (date) {
  date = new Date(date);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setDate(date.getDate() + 1);
  return date;
}

const archiveResolvers = {
  Query: {
    async archives (_, __) {
      try {
        const archives = await Archive.find();
        return archives;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async archive (_, args) {
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
    async ArchivePagination (_, args) {
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
          .skip(args.perPage * page)
        const total = await Archive.find(doc).countDocuments({});
        return { data: archives, total };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Archive: {
    async artist (_, __) {
      try {
        const artist = await Artist.findById(_.artist);
        return artist;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async group (_, __) {
      try {
        const group = await Group.findById(_.group);
        return group;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async mainImage (_, __) {
      try {
        const image = await File.findById(_.mainImage);
        return image;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async images (_, __) {
      try {
        const images = await File.find({ _id: { $in: _.images } })
        return images
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  },
  Mutation: {
    async createArchive (_, args) {
      checkArtistOrGroup(args.input);
      try {
        const archive = new Archive({ ... args.input });
        const result = await archive.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async updateArchive (_, args) {
      checkArtistOrGroup(args.input);
      try {
        const updateDoc = { $set: { ... args.input } };
        const result = await Archive.updateOne({ _id: args.id }, updateDoc);
        return result.modifiedCount === 1;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async patchArchive (_, args) {
      try {
        const updateDoc = { $set: args.input };
        const result = await Archive.updateOne({ _id: args.id }, updateDoc);
        return result.modifiedCount === 1;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async removeArchive (_, args) {
      try {
        const result = await Archive.deleteOne({ _id: args.id });
        return result.deletedCount === 1;
      } catch (error) {
        throw error;
      }
    },
  }
}

module.exports = archiveResolvers;
