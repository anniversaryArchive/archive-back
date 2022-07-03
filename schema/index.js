const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    groups:[Group]
  }
  type Group{
    _id: ID
    name: String
    artists: [String]
    debutDate: Date
  }

  scalar Date
`;

module.exports = typeDefs;