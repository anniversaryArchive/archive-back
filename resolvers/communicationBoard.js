const CommunicationBoard = require('../models/communicationBoard');
const User = require('../models/user');
const File = require('../models/file');
const { getUserId } = require('../utils');
const { getFindDoc } = require('../common/pagination');

function initInput(input) {
  const doc = { ...input };
  for (const division of ['group', 'artist', 'archive']) {
    if (input.division === division) {
      doc.data = input[division];
    }
    delete doc[division];
  }
  return doc;
}

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
    },
    async data(_, __) {
      const { data } = _;
      if (!data) { return data; }
      const fields = ['logo', 'mainImage', 'image'];
      try {
        for (const field of fields) {
          data[field] = await File.findById(data[field]);
        }
      } catch (error) { throw error; }
      return data;
    },
  },
  Mutation: {
    async createCommunicationBoard(_, args, context) {
      try {
        const doc = initInput(args.input);
        doc.author = getUserId(context);
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
        const updateDoc = initInput(Object.assign(defaultValue, args.input));
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
        const updateDoc = { $set: { ...initInput(args.input), updateAt: Date.now() } };
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
