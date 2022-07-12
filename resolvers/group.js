const Group = require('../models/group');
const Artist = require('../models/artist');
const Image = require('../models/image');

const groupResolvers = {
  Query: {
    async groups (_, __) {
      try {
        const groups = await Group.find();
        return groups;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async group (_, args) {
      try {
        const group = await Group.findById(args.id);
        return group;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async GroupPagination (_, args) {
      const sortField = args.sortField || 'createdAt';
      const sortOrder = (!args.sortOrder || args.sortOrder === "1") ? 'asc' : 'desc';
      const page = args.page || 0;

      try {
        let artists = [];
        const halfPerPage = args.perPage / 2;
        const artistTotal = await Artist.find({ group: { $exists: false } }).countDocuments({});
        if (!args.perPage || page * halfPerPage <= artistTotal) {
          artists = await Artist.find({ group: { $exists: false } })
            .sort({ [sortField]: sortOrder })
            .limit(halfPerPage)
            .skip(halfPerPage * page);
        }
        
        let skip = 0;
        if (artistTotal / halfPerPage <= page) {
          skip = artistTotal / halfPerPage + artistTotal % halfPerPage;
          if (artistTotal / halfPerPage < page) {
            const overPage = page - artistTotal / halfPerPage;
            skip += overPage * args.perPage;
          }
        } else { skip = halfPerPage * page; }

        const groups = await Group.find()
          .sort({ [sortField]: sortOrder })
          .limit(args.perPage - artists.length)
          .skip(skip)
        const total = await Group.find().countDocuments({});
        return { data: [... artists, ... groups], total: total + artistTotal };
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
  Group: {
    async artists (_, __) {
      try {
        const artists = await Artist.find({ group: _._id });
        return artists;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async logo (_, __) {
      try {
        const image = await Image.findById(_.logo);
        return image;
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
    async createGroup (_, args) {
      try {
        const { artists, debutDate } = args.input;
        
        // 아티스트 생성 시 group._id가 필요하기 때문에 위에서 그룹 생성을 먼저 해준다.
        const group = new Group({ ... args.input });
        const result = await group.save();
        const id = result._id;

        // 그룹 내 아티스트 생성
        if (artists && artists.length) {
          artists.forEach((artist) => {
            // 개인 데뷔 일자가 없는 경우, 그룹의 데뷔 일자로 넣어줍니다.
            if (!artist.debutDate) { artist.debutDate = debutDate }
            artist.group = id;
          });
          await Artist.insertMany(artists);
        }
        return await Group.findById(id);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async updateGroup (_, args) {
      const defaultValue = { name: '', updatedAt: Date.now(), debutDate: null };
      try {
        const updateValue = Object.assign(defaultValue, args.input);
        const updateDoc = { $set: updateValue };
        const result = await Group.updateOne({ _id: args.id }, updateDoc);
        return result.modifiedCount === 1;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async patchGroup (_, args) {
      try {
        const updateDoc = { $set: { ... args.input, updatedAt: Date.now() } };
        const result = await Group.updateOne({ _id: args.id }, updateDoc);
        return result.modifiedCount === 1;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async removeGroup (_, args) {
      try {
        const result = await Group.deleteOne({ _id: args.id });
        return result.deletedCount === 1;
      } catch (error) {
        throw error;
      }
    },
  }
}

module.exports = groupResolvers;
