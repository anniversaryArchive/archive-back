const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },       // 생성 일자 
  updatedAt: { type: Date, default: Date.now },       // 마지막 업데이트 일자 
  name: String,                                       // 이름 
  mimetype: { type: String, default: 'image/jpeg' },  // 저장된 파일의 mimetype
  size: { type: Number },                             // 파일 사이즈 
  path: { type: String, required: true },             // 파일 url
});

module.exports = mongoose.model('file', fileSchema);
