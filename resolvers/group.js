const Group = require('../models/group');
const Artist = require('../models/artist');
const File = require('../models/file');

const { getFindDoc } = require('../common/pagination');

async function createGroup(data) {
  try {
    const { artists, newArtists, debutDate } = data;

    // 아티스트 생성 시 group._id가 필요하기 때문에 위에서 그룹 생성을 먼저 해준다.
    const group = new Group({ ...data });
    const result = await group.save();
    const id = result._id;

    // 그룹 내 새로운 아티스트 생성
    if (newArtists && newArtists.length) {
      newArtists.forEach((artist) => {
        // 개인 데뷔 일자가 없는 경우, 그룹의 데뷔 일자로 넣어줍니다.
        if (!artist.debutDate) { artist.debutDate = debutDate }
        artist.group = id;
      });
      await Artist.insertMany(newArtists);
    }

    // 아티스트에 그룹 연결
    if (artists && artists.length) {
      await Artist.updateMany({ _id: artists }, { $set: { group: id } });
    }

    return await Group.findById(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateArtists(id, artists) {
  try {
    // 기존에 있는 그룹 내 아티스트 리스트 가져오기
    const orgArtists = await Artist.find({ group: id });
    const removeArtists = orgArtists.filter((artist) => {
      return !artists.some((a) => a === `${artist._id}`);
    }).map((artist) => `${artist._id}`);

    // 아티스트 그룹 연결 풀기
    if (removeArtists && removeArtists.length) {
      await Artist.updateMany({ _id: removeArtists }, { $set: { group: null } });
    }

    // 아티스트에 그룹 연결
    if (artists && artists.length) {
      await Artist.updateMany({ _id: artists }, { $set: { group: id } });
    }
  } catch (error) { console.error(error); }
}

const groupResolvers = {
  Query: {
    async groups(_, __) {
      try {
        const groups = await Group.find();
        return groups;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async group(_, args) {
      try {
        const group = await Group.findById(args.id);
        return group;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    /**
     * Group을 Pagination으로 가져온다.
     * - page(Int): 현재 페이지 (0부터 시작)
     * - perPage(Int): 한 페이지에 보여줄 데이터 수
     * - sortField(String): 데이터 정렬할 필드 이름
     * - sortOrder(Int): 1: 오름차순, -1: 내림차순
     * - filter(FilterOption)
     */
    async GroupPagination(_, args) {
      const sortField = args.sortField || 'createdAt';
      const sortOrder = args.sortOrder || 1;
      const page = args.page || 0;
      const doc = getFindDoc(args.filter);
      try {
        const data = await Group.find(doc)
          .sort({ [sortField]: sortOrder })
          .limit(args.perPage)
          .skip(args.perPage * page)
        const groupTotal = await Group.find(doc).countDocuments({});
        const total = groupTotal;
        return { data, total };
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
  Group: {
    async artists(_, __) {
      try {
        const artists = await Artist.find({ group: _._id });
        return artists;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async logo(_, __) {
      try {
        const file = await File.findById(_.logo);
        return file;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    /**
     * Group 생성 시, Group 내 Artist도 한 번에 생성 가능
     */
    async createGroup(_, args) {
      try {
        return await createGroup(args.input);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async updateGroup(_, args) {
      const defaultValue = { name: '', englishName: '', updatedAt: Date.now(), debutDate: null };
      try {
        const { artists } = args.input;
        await updateArtists(args.id, artists);

        const updateValue = Object.assign(defaultValue, args.input);
        const updateDoc = { $set: updateValue };
        const result = await Group.updateOne({ _id: args.id }, updateDoc);
        return result.modifiedCount === 1;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async patchGroup(_, args) {
      try {
        const { artists } = args.input;
        await updateArtists(args.id, artists);

        const updateDoc = { $set: { ...args.input, updatedAt: Date.now() } };
        const result = await Group.updateOne({ _id: args.id }, updateDoc);
        return result.modifiedCount === 1;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async removeGroup(_, args) {
      try {
        const result = await Group.deleteOne({ _id: args.id });
        return result.deletedCount === 1;
      } catch (error) {
        throw error;
      }
    },
  }
}

module.exports = { groupResolvers, createGroup };
