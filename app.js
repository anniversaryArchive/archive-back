const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} = require('apollo-server-core');
require('dotenv').config();

const port = process.env.PORT || 3001;
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
const groupRouter = require('./routes/group');
const imageRouter = require('./routes/image');
const authRouter = require('./routes/auth');

app.use('/', indexRouter);
app.use('/group', groupRouter);
app.use('/image', imageRouter);
app.use('/auth', authRouter);

dbConnect();

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
});

server.start().then((_) => {
  server.applyMiddleware({ app, path: '/' });
  app.listen({ port }, () =>
    console.log(`Gateway API running at port: ${port}`),
  );
});
