const { gql } = require('apollo-server');

const groupTypeDefs = require('./group');
const artistTypeDefs = require('./artist');
const imageTypeDefs = require('./image');

const typeDefs = gql`
  ${groupTypeDefs}
  ${artistTypeDefs}
  ${imageTypeDefs}
  scalar Date
`;

module.exports = typeDefs;