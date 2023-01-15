const mongoose = require('mongoose');

const archiveSchema = new mongoose.Schema({
  name: { type: String, required: true },                       // 카페 이름 
  themeName: { type: String, required: true },                  // 카페 테마 명 
  address: { type: String, required: true },                    // 주소
  lat: { type: Number, default: 0.0 },                          // 위도
  lng: { type: Number, default: 0.0 },                          // 경도  
  organizer: { type: String, required: true },                  // 주최자 (트위터 아이디)
  startDate: { type: Date, required: true },                    // 카페 시작일
  endDate: { type: Date, required: true },                      // 카페 종료일 
  openTime: Date,                                               // 영업 시작 시간 
  closeTime: Date,                                              // 영업 종료 시간 
  mainImage: { type: mongoose.Types.ObjectId, required: true }, // 메인 이미지 
  images: [mongoose.Types.ObjectId],                            // 이미지리스트 
  phoneNumber: String,                                          // 전화번호 
  link: String,                                                 // 대표링크 
});

module.exports = mongoose.model('archive', archiveSchema);
