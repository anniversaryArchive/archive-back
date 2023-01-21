const { gql } = require('apollo-server-express');

const groupTypeDefs = require('./group');
const artistTypeDefs = require('./artist');
const archiveTypeDefs = require('./archive');
const fileTypeDefs = require('./file');

const typeDefs = gql`
  input FilterOption {
    q: String
    fields: [String]
  }
  ${groupTypeDefs}
  ${artistTypeDefs}
  ${archiveTypeDefs}
  ${fileTypeDefs}
  scalar Date
`;

module.exports = typeDefs;