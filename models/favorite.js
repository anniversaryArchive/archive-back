const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true },    // 즐겨찾기한 유저
  group: { type: mongoose.Types.ObjectId, require: true },    // 즐겨찾기한 카페 그룹
  archive: { type: mongoose.Types.ObjectId, required: true, ref: 'archive' }, // 즐겨찾기한 카페
  createdAt: { type: Date, default: Date.now },               // 생성 일자
  updatedAt: { type: Date, default: Date.now },               // 마지막 업데이트 일자
});

module.exports = mongoose.model('favorite', favoriteSchema);
