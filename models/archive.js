const mongoose = require('mongoose');

const archiveSchema = new mongoose.Schema({
    lat: { type: Number, default: 0.0 },            // 위도
    lng: { type: Number, default: 0.0 },            // 경도 
    archiveName: { type: String, required: true },  // 아카이브 명 
    themeName: { type: String, required: true },    // 아카이브 테마 명 
    address: { type: String, required: true },      // 아카이브 주소 
    organizer: String,                              // 주최자 
    startDate: { type: Date, required: true },      // 아카이브 시작일
    endDate: { type: Date, required: true },        // 아카이브 종료일 
    reviewCount: { type: Number, default: 0 },      // 리뷰갯수  
    likeCount: { type: Number, default: 0 },        // 좋아요갯수 
    number: String,                                 // 아카이브 전화번호 
    link: String,                                   // 아카이브 대표링크 
});

module.exports = mongoose.model('archive', archiveSchema);
