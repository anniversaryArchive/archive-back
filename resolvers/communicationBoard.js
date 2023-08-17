const CommunicationBoard = require('../models/communicationBoard');
const User = require('../models/user');
const { getUserId } = require('../utils');
const { getFindDoc } = require('../common/pagination');

const communicationBoardResolvers = {
  Query: {
    async CommunicationBoard(_, args) {
      try {
        const communicationBoard = await CommunicationBoard.findById(args.id);
        return communicationBoard;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async CommunicationBoardPagination(_, args) {
      const sortField = args.sortField || 'createdAt';
      const sortOrder = args.sortOrder || 1;
      const page = args.page || 0;
      const doc = getFindDoc(args.filter);

      try {
        const communicationBoards = await CommunicationBoard.find(doc)
          .sort({ [sortField]: sortOrder })
          .limit(args.perPage)
          .skip(args.perPage * page)
        const total = await CommunicationBoard.find(doc).countDocuments({});
        return { data: communicationBoards, total };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  CommunicationBoard: {
    async author(_, __) {
      try {
        const author = await User.findById(_.author);
        return author;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  },
  Mutation: {
    async createCommunicationBoard(_, args, context) {
      try {
        const doc = { ...args.input };
        doc.author = getUserId(context);
        for (const division of ['group', 'artist', 'archive']) {
          if (args.input.division) { doc.data = args.input[division]; }
          delete doc[division];
        }
        const communicationBoard = new CommunicationBoard(doc);
        const result = await communicationBoard.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async updateCommunicationBoard(_, args, context) {
      // TODO: 같은 유저인지 체크
      const author = getUserId(context);
      const defaultValue = { updateAt: Date.now(), author };
      try {
        const updateDoc = Object.assign(defaultValue, args.input);
        const result = await CommunicationBoard.updateOne({ _id: args.id }, updateDoc);
        return result.modifiedCount === 1;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async patchCommunicationBoard(_, args) {
      // TODO: 같은 유저인지 체크
      try {
        const updateDoc = { $set: { ...args.input, updateAt: Date.now() } };
        const result = await CommunicationBoard.updateOne({ _id: args.id }, updateDoc);
        return result.modifiedCount === 1;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async removeCommunicationBoard(_, args) {
      // TODO: 같은 유저인지 체크
      try {
        const result = await CommunicationBoard.deleteOne({ _id: args.id });
        return result.deletedCount === 1;
      } catch (error) {
        throw error;
      }
    },
  }
}

module.exports = communicationBoardResolvers;
