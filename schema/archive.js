const { gql } = require('apollo-server-express');

const archiveTypeDefs = gql`
  type Query {
    archives: [Archive]
    archive (id: ID!): Archive
  }
  type Archive {
    _id: ID
    archiveName: String
    themeName: String
    address: String
    reviewCount: Int
    likeCount: Int
    number: String
    link: String
  }
  input createArchiveInput {
    archiveName: String
    themeName: String!
    address: String
    number: String!
    link: String!
  }
  input updateArchiveInput {
    archiveName: String
    themeName: String!
    address: String
    number: String!
    link: String!
  }

  type Mutation {
    createArchive (input: createArchiveInput!): Archive!
    updateArchive (id: ID!, input: updateArchiveInput!): Boolean
    patchArchive (id: ID!, input: updateArchiveInput!): Boolean
    removeArchive (id: ID!): Boolean
  }
`

module.exports = archiveTypeDefs
