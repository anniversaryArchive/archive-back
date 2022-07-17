const mongoose = require("mongoose");
require("dotenv").config();

const url = `mongodb+srv://${process.env.ID}:${process.env.PASSWORD}@archive.esqyg.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

module.exports = () => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB Connect");
    })
    .catch((err) => {
      console.log(err);
    });
};
