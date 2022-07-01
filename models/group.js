const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: String,     // 그룹명
  debutDate: { type: Date, default: Date.now },  // 데뷔일
  artists: [mongoose.Types.ObjectId], // 그룹 내 멤버 Array
});

module.exports = mongoose.model('group', groupSchema);
