const express = require('express');
const dbConfig = require('./config/db-config.json')
const mongoose = require('mongoose')

const app = express();
const port = 3000;

const indexRouter = require('./routes/index');
const archiveRouter = require('./routes/archive');

const url = 'mongodb+srv://<id>:<password>@archive.esqyg.mongodb.net/Archive?retryWrites=true&w=majority';

app.use('/', indexRouter);
app.use('/archive', archiveRouter);

const url = `mongodb+srv://${dbConfig.user}:${dbConfig.password}@archive.esqyg.mongodb.net/${dbConfig.database}?retryWrites=true&w=majority`;
mongoose.connect(url).then(() => {
      console.log("MongoDB Connect")
  }).catch((err) => {
      console.log(err)
  });
  
  
  app.listen(port, () => {
      console.log("Server is Connect!");
  });