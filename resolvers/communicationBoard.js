const { ApolloError } = require('apollo-server-express');
const CommunicationBoard = require('../models/communicationBoard');
const User = require('../models/user');
const File = require('../models/file');
const Group = require('../models/group');
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

// 게시글을 생성한 유저와 같은 유저인지 체크
async function checkAuthor(id, author) {
  try {
    const communicationBoard = await CommunicationBoard.findById(id);
    if (!communicationBoard) { return null; }
    if (String(communicationBoard.author) !== author) {
      throw new ApolloError('This user is not an author.', 403, {});
    }
  } catch (error) { throw error; }
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
      doc.fixed = { $ne: true };

      try {
        const fixedCommunicationBoards = await CommunicationBoard.find({ fixed: true });
        const communicationBoards = await CommunicationBoard.find(doc)
          .sort({ [sortField]: sortOrder })
          .limit(args.perPage)
          .skip(args.perPage * page)
        const total = await CommunicationBoard.find(doc).countDocuments({});
        return { data: [...fixedCommunicationBoards, ...communicationBoards], total };
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
          if (!data[field]) { continue; }
          data[field] = await File.findById(data[field]);
        }
        if (data.group) {
          data.group = await Group.findById(data.group);
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
        doc.fixed = doc.fixed || false;
        const communicationBoard = new CommunicationBoard(doc);
        const result = await communicationBoard.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async updateCommunicationBoard(_, args, context) {
      const author = getUserId(context);
      try {
        await checkAuthor(args.id, author);
        const defaultValue = { updateAt: Date.now(), author };
        const updateDoc = initInput(Object.assign(defaultValue, args.input));
        const result = await CommunicationBoard.updateOne({ _id: args.id }, updateDoc);
        return result.modifiedCount === 1;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async patchCommunicationBoard(_, args, context) {
      try {
        await checkAuthor(args.id, getUserId(context));
        const updateDoc = { $set: { ...initInput(args.input), updateAt: Date.now() } };
        const result = await CommunicationBoard.updateOne({ _id: args.id }, updateDoc);
        return result.modifiedCount === 1;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async removeCommunicationBoard(_, args, context) {
      try {
        await checkAuthor(args.id, getUserId(context));
        const result = await CommunicationBoard.deleteOne({ _id: args.id });
        return result.deletedCount === 1;
      } catch (error) {
        throw error;
      }
    },
  }
}

module.exports = communicationBoardResolvers;
