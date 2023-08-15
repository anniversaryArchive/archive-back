const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  provider: { type: String, required: true },     // 'google', 'naver', 'twitter'
  providerId: { type: String, required: true },
  image: String,
  createdAt: { type: Date, default: Date.now },   // 생성 일자
  updatedAt: { type: Date, default: Date.now },   // 마지막 업데이트 일자
});

module.exports = mongoose.model('user', userSchema);
