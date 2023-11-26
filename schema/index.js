const { gql } = require('apollo-server-express');

const groupTypeDefs = require('./group');
const artistTypeDefs = require('./artist');
const archiveTypeDefs = require('./archive');
const fileTypeDefs = require('./file');
const favoriteTypeDefs = require('./favorite');
const favoriteGroupTypeDefs = require('./favoriteGroup');
const userTypeDefs = require('./user');
const communicationBoardTypeDefs = require('./communicationBoard');

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
  ${favoriteGroupTypeDefs}
  ${userTypeDefs}
  ${communicationBoardTypeDefs}
  scalar Date
`;

module.exports = typeDefs;
