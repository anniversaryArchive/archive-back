const mongoose = require("mongoose");

const userSchmea = new mongoose.Schema({
  email: String,
  nickName: String,
  token: String,
  // TODO : archive 리스트
});

module.exports = mongoose.model("user", userSchmea);
