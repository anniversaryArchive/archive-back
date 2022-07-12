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
    /**
     * Group을 Pagination으로 가져온다.
     * - includeSolo 가 true인 경우, 뒤에 Solo Artist도 포함한다.
     */
    async GroupPagination (_, args) {
      const sortField = args.sortField || 'createdAt';
      const sortOrder = (!args.sortOrder || args.sortOrder === '1') ? 'asc' : 'desc';
      const page = args.page || 0;

      try {
        let data = await Group.find()
          .sort({ [sortField]: sortOrder })
          .limit(args.perPage)
          .skip(args.perPage * page)
        const groupTotal = await Group.find().countDocuments({});
        let total = groupTotal;

        // 솔로 아티스트가 포함인 경우, 뒤에 솔로 아티스트도 포함해서 리스트를 보여준다.
        if (args.includeSolo && data.length < args.perPage) {
          total += await Artist.find({ group: { $exists: false } }).countDocuments({});
          const skip = (args.page * args.perPage) - groupTotal + data.length;
          const artists = await Artist.find({ group: { $exists: false } })
            .sort({ [sortField]: sortOrder })
            .limit(args.perPage - data.length)
            .skip(skip);
          data = data.concat(artists.map((artist) => {
            artist.logo = artist.image;
            artist.isSoloArtist = true
            return artist;
          }));
        }
        return { data, total };
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
