const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: String,
  desc: String,
  filename: { type: String, required: true },
  mimetype: { type: String, default: 'image/jpeg' },
  data: Buffer,
});

module.exports = mongoose.model('image', imageSchema);
