const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const dbConnect = require('./mongodb/mongodb');

const indexRouter = require('./routes/index');
const archiveRouter = require('./routes/archive');
const groupRouter = require('./routes/group');
const imageRouter = require('./routes/image');

app.use('/', indexRouter);
app.use('/archive', archiveRouter);
app.use('/group', groupRouter);
app.use('/image', imageRouter);

dbConnect();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true
});

server.start().then(_ => {
  server.applyMiddleware({ app, path: '/' });
  app.listen({ port }, () => 
    console.log(`Gateway API running at port: ${port}`)
  );  
});

