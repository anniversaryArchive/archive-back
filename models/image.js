const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now }, // 생성 일자 
  updatedAt: { type: Date, default: Date.now }, // 마지막 업데이트 일자 
  name: String,
  desc: String,
  filename: { type: String, required: true },
  mimetype: { type: String, default: 'image/jpeg' },
  data: Buffer,
});

module.exports = mongoose.model('image', imageSchema);
