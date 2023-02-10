const { gql } = require('apollo-server-express');

const groupTypeDefs = gql`
  type Query {
    groups:[Group]
    group (id: ID!): Group
    GroupPagination (page: Int, perPage: Int, sortField: String, sortOrder: Int, filter: FilterOption): GroupPage
  }
  type Group {
    _id: ID
    createdAt: Date
    updatedAt: Date
    name: String
    englishName: String
    artists: [Artist]
    debutDate: Date
    logo: File
    color: String
    isSoloArtist: Boolean
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
    englishName: String
    debutDate: Date!
    artists: [ID]
    newArtists: [ArtistInput]
    logo: ID!
    color: String
  }
  input updateGroupInput {
    name: String!
    englishName: String
    debutDate: Date!
    artists: [ID]
    logo: ID!
    color: String
  }
  input patchGroupInput {
    name: String
    englishName: String
    debutDate: Date
    artists: [ID]
    logo: ID
    color: String
  }
  type Mutation {
    createGroup (input: createGroupInput!): Group
    updateGroup (id: ID!, input: updateGroupInput!): Boolean
    patchGroup (id: ID!, input: patchGroupInput!): Boolean
    removeGroup (id: ID!): Boolean
  }
`

module.exports = groupTypeDefs
