const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  provider: { type: String, required: true },     // 'google', 'naver', 'twitter'
  providerId: { type: String, required: true },
  role: { type: String, default: 'user' },
  image: String,
});

module.exports = mongoose.model('user', userSchema);
