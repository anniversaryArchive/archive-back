const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },       // 생성 일자 
  updatedAt: { type: Date, default: Date.now },       // 마지막 업데이트 일자 
  name: String,                                       // 이름 
  desc: String,                                       // 설명 
  filename: { type: String, required: true },         // 서버에 저장된 파일명 
  mimetype: { type: String, default: 'image/jpeg' },  // 저장된 파일의 mimetype
  data: Buffer,                                       // 저장된 파일 Buffer 
});

module.exports = mongoose.model('image', imageSchema);
