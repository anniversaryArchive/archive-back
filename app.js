const express = require('express');
const dbConfig = require('./config/db-config.json');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');

const app = express();
const port = 3000;


const typeDefs = require('./typeDefs/schema.js');
const resolvers = require('./resolvers');

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
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true
  });
  
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });