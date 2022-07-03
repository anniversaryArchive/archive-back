const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },       // 그룹명
  createdAt: { type: Date, default: Date.now }, // 생성 일자 
  updatedAt: { type: Date, default: Date.now }, // 마지막 업데이트 일자 
  debutDate: { type: Date, required: true },    // 데뷔일
  artists: [mongoose.Types.ObjectId], // 그룹 내 멤버 Array
});

module.exports = mongoose.model('group', groupSchema);
