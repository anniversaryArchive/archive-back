const { gql } = require('apollo-server-express');

const groupTypeDefs = require('./group');
const artistTypeDefs = require('./artist');
const archiveTypeDefs = require('./archive');
const fileTypeDefs = require('./file');
const favoriteTypeDefs = require('./favorite');

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
  ${favoriteTypeDefs}
  scalar Date
`;

module.exports = typeDefs;