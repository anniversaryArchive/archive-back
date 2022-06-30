const express = require('express');
const dbConfig = require('./config/db-config.json')
const mongoose = require('mongoose')

const app = express();
const port = 3000;

const indexRouter = require('./routes/index');
const archiveRouter = require('./routes/archive');
const groupRouter = require('./routes/group');

app.use('/', indexRouter);
app.use('/archive', archiveRouter);
app.use('/group', groupRouter);

const url = `mongodb+srv://${dbConfig.user}:${dbConfig.password}@archive.esqyg.mongodb.net/${dbConfig.database}?retryWrites=true&w=majority`;
mongoose.connect(url).then(() => {
      console.log("MongoDB Connect")
  }).catch((err) => {
      console.log(err)
  });
  
  
  app.listen(port, () => {
      console.log("Server is Connect!");
  });