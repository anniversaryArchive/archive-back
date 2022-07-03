const { gql } = require('apollo-server');

const groupTypeDefs = require('./group');
const artistTypeDefs = require('./artist');

const typeDefs = gql`
  ${groupTypeDefs}
  ${artistTypeDefs}
  scalar Date
`;

module.exports = typeDefs;