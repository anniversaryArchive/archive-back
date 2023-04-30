const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} = require('apollo-server-core');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { applyMiddleware } = require('graphql-middleware');
const { permissions } = require('./guards/index.js');
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const dbConnect = require('./mongodb/mongodb');

const indexRouter = require('./routes/index');
const groupRouter = require('./routes/group');
const fileRouter = require('./routes/file');

app.use('/', indexRouter);
app.use('/group', groupRouter);
app.use('/file', fileRouter);

dbConnect();

const schema = applyMiddleware(makeExecutableSchema({ typeDefs, resolvers }), ...[permissions]);

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault({
          graphRef: process.env.APOLLO_GRAPH_REF,
          footer: false,
        })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ],
  context: (data) => {
    const { req, reply } = data;
    return { request: req, reply };
  },
});

server.start().then(_ => {
  server.applyMiddleware({ app, path: '/' });
  app.listen({ port }, () => 
    console.log(`Gateway API running at port: ${port}`)
  );  
});

