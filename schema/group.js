const { gql } = require('apollo-server');

const groupTypeDefs = gql`
  type Query {
    groups:[Group]
    group (id: ID!): Group
  }
  type Group {
    _id: ID
    createdAt: Date
    updatedAt: Date
    name: String
    artists: [Artist]
    debutDate: Date
  }
  input ArtistInput {
    name: String!
    debutDate: Date
    birthDay: Date!
  }
  input createGroupInput {
    name: String!
    debutDate: Date!
    artists: [ArtistInput]
  }
  input updateGroupInput {
    name: String
    debutDate: Date
    artists: [ID]
  }
  type Mutation {
    createGroup (input: createGroupInput!): Group
    updateGroup (id: ID!, input: updateGroupInput!): Group
    patchGroup (id: ID!, input: updateGroupInput!): Boolean
    removeGroup (id: ID!): Boolean
  }
`

module.exports = groupTypeDefs
