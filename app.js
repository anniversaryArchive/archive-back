const express = require('express');
const mongoose = require('mongoose')

const app = express();
const port = 3000;

const indexRouter = require('./routes/index');
const archiveRouter = require('./routes/archive');

// password : alflarhkgkrrh1 (미림과학고1)
const url = 'mongodb+srv://yejin:alflarhkgkrrh1@archive.esqyg.mongodb.net/Archive?retryWrites=true&w=majority';

app.use('/', indexRouter);
app.use('/archive', archiveRouter);


mongoose.connect(url).then(() => {
      console.log("MongoDB Connect")
  }).catch((err) => {
      console.log(err)
  });
  
  
  app.listen(port, () => {
      console.log("Server is Connect!");
  });