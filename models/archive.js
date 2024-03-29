const mongoose = require('mongoose');

const archiveSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 카페 이름
  themeName: { type: String, required: true }, // 카페 테마 명
  artist: mongoose.Types.ObjectId, // 아티스트
  group: mongoose.Types.ObjectId, // 그룹
  address: { type: String, required: true }, // 주소
  detailAddress: String, // 상세 주소
  lat: { type: Number, default: 0.0 }, // 위도
  lng: { type: Number, default: 0.0 }, // 경도
  organizer: { type: String, required: true }, // 주최자 (트위터 아이디)
  startDate: { type: Date, required: true }, // 카페 시작일
  endDate: { type: Date, required: true }, // 카페 종료일
  openTime: Object, // 영업 시작 시간
  closeTime: Object, // 영업 종료 시간
  mainImage: { type: mongoose.Types.ObjectId, required: true }, // 메인 이미지
  images: [mongoose.Types.ObjectId], // 이미지리스트
  phoneNumber: String, // 전화번호
  link: String, // 대표링크
  districtCode: { type: Number, default: 1 }, // 지역 코드
});

module.exports = mongoose.model('archive', archiveSchema);
