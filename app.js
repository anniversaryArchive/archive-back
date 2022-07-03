const express = require('express');
const { ApolloServer } = require('apollo-server');

const app = express();

const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/resolver');

const dbConnect = require('./mongodb/mongodb');

const indexRouter = require('./routes/index');
const archiveRouter = require('./routes/archive');
const groupRouter = require('./routes/group');

app.use('/', indexRouter);
app.use('/archive', archiveRouter);
app.use('/group', groupRouter);

dbConnect();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true
});

server.listen().then(({ url }) => {
    console.log(`Server : ${url}`);
});