const { gql } = require('apollo-server');

const groupTypeDefs = require('./group');

const typeDefs = gql`
  ${groupTypeDefs}
  scalar Date
`;

module.exports = typeDefs;