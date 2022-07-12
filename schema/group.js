const { gql } = require('apollo-server-express');

const groupTypeDefs = gql`
  type Query {
    groups:[Group]
    group (id: ID!): Group
    GroupPagination (page: Int, perPage: Int, sortField: String, sortOrder: String, includeSolo: Boolean): GroupPage
  }
  type Group {
    _id: ID
    createdAt: Date
    updatedAt: Date
    name: String
    artists: [Artist]
    debutDate: Date
    logo: Image
    color: String
  }
  type GroupPage {
    data: [Group]
    total: Int!
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
    logo: ID
    color: String
  }
  input updateGroupInput {
    name: String
    debutDate: Date
    artists: [ID]
    logo: ID
    color: String
  }
  type Mutation {
    createGroup (input: createGroupInput!): Group
    updateGroup (id: ID!, input: updateGroupInput!): Boolean
    patchGroup (id: ID!, input: updateGroupInput!): Boolean
    removeGroup (id: ID!): Boolean
  }
`

module.exports = groupTypeDefs
