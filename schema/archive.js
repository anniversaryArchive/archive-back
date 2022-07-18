const { gql } = require('apollo-server-express');

const archiveTypeDefs = gql`
  type Query {
    archives: [Archive]
    archive (id: ID!): Archive
  }
  type Archive {
    _id: ID
    lat: Float
    lng: Float
    archiveName: String
    themeName: String
    organizer: String
    address: String
    startDate: Date
    endDate: Date
    reviewCount: Int
    likeCount: Int
    images:[Image]
    phoneNumber: String
    link: String
  }
  input createArchiveInput {
    lat: Float!
    lng: Float!
    archiveName: String!
    themeName: String
    organizer: String
    address: String!
    startDate: Date!
    endDate: Date!
    images:[ID]
    phoneNumber: String
    link: String
  }
  input updateArchiveInput {
    lat: Float
    lng: Float
    archiveName: String
    themeName: String
    organizer: String
    address: String
    startDate: Date
    endDate: Date
    images:[ID]
    phoneNumber: String
    link: String
  }

  type Mutation {
    createArchive (input: createArchiveInput!): Archive!
    updateArchive (id: ID!, input: updateArchiveInput!): Boolean
    patchArchive (id: ID!, input: updateArchiveInput!): Boolean
    removeArchive (id: ID!): Boolean
  }
`

module.exports = archiveTypeDefs
