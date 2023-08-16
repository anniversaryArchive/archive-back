const mongoose = require('mongoose');

const communicationBoardSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },             // 생성 일자
  updatedAt: { type: Date, default: Date.now },             // 마지막 업데이트 일자
  division: {
    type: String,
    enum: ['notice', 'group', 'artist', 'archive', 'improvement', 'error'],
    default: 'notice'
  }, // 분류
  title: { type: String, required: true },  // 제목
  content: String,  // 내용
  author: mongoose.Types.ObjectId,    // 작성자
  data: mongoose.Schema.Types.Mixed,  // 요청한 데이터
  fixed: Boolean, // 고정 여부
  status: {
    type: String,
    enum: ['none', 'request', 'accept', 'reject'],
    default: 'none',
  },  // 현재 상태
  message: String,  // 관리자 메시지
});

module.exports = mongoose.model('communicationBoard', communicationBoardSchema);
