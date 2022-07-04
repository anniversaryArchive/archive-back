const express = require('express');
const { ApolloServer } = require('apollo-server');

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

server.listen().then(({ url }) => {
  console.log(`Server : ${url}`);
});

app.listen(3000, () => {
  console.log('Restful server port : 3000');
});
