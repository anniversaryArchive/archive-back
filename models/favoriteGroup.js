const mongoose = require('mongoose');

const favoriteGroupSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now }, // 생성 일자
  updatedAt: { type: Date, default: Date.now }, // 마지막 업데이트 일자
  user: { type: mongoose.Types.ObjectId, required: true }, // 해당 Favorite Group을 생성한 유저
  title: { type: String, required: true }, // 제목
  description: { type: String, default: '' }, // 설명
  color: String, // 색상값
  archives: { type: [mongoose.Types.ObjectId], required: true, ref: 'archive' }, // 즐겨찾기한 카페 리스트
});

module.exports = mongoose.model('favoriteGroup', favoriteGroupSchema);
