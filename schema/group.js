const { gql } = require('apollo-server');

const groupTypeDefs = gql`
  type Query {
    groups:[Group]
  }
  type Group {
    _id: ID
    createdAt: Date
    updatedAt: Date
    name: String
    artists: [String]
    debutDate: Date
  }
  input GroupInput {
    name: String!
    debutDate: Date!
  }
  type Mutation {
    createGroup (input: GroupInput!): Group!
  }
`

module.exports = groupTypeDefs
