const Artist = require('../models/artist');
const Group = require('../models/group');
const File = require('../models/file');
const { ApolloError } = require('apollo-server-express');

const { getFindDoc } = require('../common/pagination');

async function createArtist(data) {
  try {
    const { debutDate, group } = data;

    // 데뷔날짜가 없는 경우, 그룹 id가 있으면 그룹의 데뷔날짜를 넣어준다.
    if (!debutDate) {
      if (!group) {
        throw new ApolloError('The debut date is a must.', 1001, {});
      }
      const findGroup = await Group.findById(group);
      if (findGroup) { data = group.debutDate; }
    }

    const artist = new Artist({ ...data });
    const result = await artist.save();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const artistResolvers = {
  Query: {
    async artists(_, __) {
      try {
        const artists = await Artist.find();
        return artists;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async artist(_, args) {
      try {
        const artist = await Artist.findById(args.id);
        return artist;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    /**
     * Artist를 Pagination으로 가져온다.
     * - page(Int): 현재 페이지 (0부터 시작)
     * - perPage(Int): 한 페이지에 보여줄 데이터 수
     * - sortField(String): 데이터 정렬할 필드 이름
     * - sortOrder(Int): 1: 오름차순, -1: 내림차순
     * - filter(FilterOption)
     */
    async ArtistPagination(_, args) {
      const sortField = args.sortField || 'createdAt';
      const sortOrder = args.sortOrder || 1;
      const page = args.page || 0;
      const doc = getFindDoc(args.filter);

      try {
        const artists = await Artist.find(doc)
          .sort({ [sortField]: sortOrder })
          .limit(args.perPage)
          .skip(args.perPage * page)
        const total = await Artist.find(doc).countDocuments({});
        return { data: artists, total };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Artist: {
    async group(_, __) {
      try {
        const group = await Group.findById(_.group);
        return group;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async image(_, __) {
      try {
        const image = await File.findById(_.image);
        return image;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
  Mutation: {
    /**
     * 아티스트 생성
     * Error Code
     * - 1001: 데뷔일자와 그룹 ID 둘 다 없는 경우
     */
    async createArtist(_, args) {
      try {
        return await createArtist(args.input);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async updateArtist(_, args) {
      const defaultValue = { name: '', updatedAt: Date.now(), debutDate: null, birthDay: null, group: null };
      try {
        const updateValue = Object.assign(defaultValue, args.input);
        const updateDoc = { $set: updateValue };
        const result = await Artist.updateOne({ _id: args.id }, updateDoc);
        return result.modifiedCount === 1;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async patchArtist(_, args) {
      try {
        const updateDoc = { $set: { ...args.input, updatedAt: Date.now() } };
        const result = await Artist.updateOne({ _id: args.id }, updateDoc);
        return result.modifiedCount === 1;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async removeArtist(_, args) {
      try {
        const result = await Artist.deleteOne({ _id: args.id });
        return result.deletedCount === 1;
      } catch (error) {
        throw error;
      }
    },
  }
}

module.exports = { artistResolvers, createArtist };
