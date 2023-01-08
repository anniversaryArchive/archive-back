const { gql } = require('apollo-server-express');

const groupTypeDefs = require('./group');
const artistTypeDefs = require('./artist');
const archiveTypeDefs = require('./archive');
const imageTypeDefs = require('./image');
const fileTypeDefs = require('./file');

const typeDefs = gql`
  ${groupTypeDefs}
  ${artistTypeDefs}
  ${archiveTypeDefs}
  ${imageTypeDefs}
  ${fileTypeDefs}
  scalar Date
`;

module.exports = typeDefs;