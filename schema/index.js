const { gql } = require('apollo-server-express');

const groupTypeDefs = require('./group');
const artistTypeDefs = require('./artist');
const archiveTypeDefs = require('./archive');
const fileTypeDefs = require('./file');
const userTypeDefs = require('./user');

const typeDefs = gql`
  scalar Object
  input FilterOption {
    q: String
    fields: [String]
    flds: Object
  }
  ${groupTypeDefs}
  ${artistTypeDefs}
  ${archiveTypeDefs}
  ${fileTypeDefs}
  ${userTypeDefs}
  scalar Date
`;

module.exports = typeDefs;