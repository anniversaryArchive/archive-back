const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },       // 아티스트 명 
  createdAt: { type: Date, default: Date.now }, // 생성 일자 
  updatedAt: { type: Date, default: Date.now }, // 마지막 업데이트 일자 
  debutDate: { type: Date, required: true },    // 데뷔일
  birthDay: { type: Date, required: true },     // 생일 
  group: mongoose.Types.ObjectId,               // 아티스트가 속한 그룹 
});

module.exports = mongoose.model('artist', artistSchema);

