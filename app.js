const express = require('express');
const app = express();

const indexRouter = require('./routes/index');
const archiveRouter = require('./routes/archive');

app.use('/', indexRouter);
app.use('/archive', archiveRouter);

const port = 3000;
app.listen(port, function () {
  console.log(`Server running ... port : ${port}`);
});
