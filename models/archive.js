const mongoose = require('mongoose');

const archiveSchema = new mongoose.Schema({
    archiveName: { type: String, required: true },  // 아카이브 명 
    themeName: { type: String, required: true },    // 아카이브 테마 명 
    address: { type: String, required: true },      // 아카이브 주소 
    reviewCount: { type: Number, default: 0 },         // 리뷰갯수  
    likeCount: { type: Number, default: 0 },           // 좋아요갯수 
    number: String,                                 // 아카이브 전화번호 
    link: String,                                   // 아카이브 대표링크 
});

module.exports = mongoose.model('archive', archiveSchema);
