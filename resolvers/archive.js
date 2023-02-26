const Archive = require('../models/archive');
const { getFindDoc } = require('../common/pagination');

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
     */
    async ArchivePagination (_, args) {
      const sortField = args.sortField || 'createdAt';
      const sortOrder = args.sortOrder || 1;
      const page = args.page || 0;
      const doc = getFindDoc(args.filter);

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
  Mutation: {
    async createArchive (_, args) {
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
