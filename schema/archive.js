const { gql } = require('apollo-server-express');

const archiveTypeDefs = gql`
  type Query {
    archives: [Archive]
    archive (id: ID!): Archive
  }
  type Archive {
    _id: ID
    name: String
    themeName: String
    address: String
    lat: Float
    lng: Float
    organizer: String
    startDate: Date
    endDate: Date
    openTime: Date
    closeTime: Date
    mainImage: File
    images:[File]
    phoneNumber: String
    link: String
  }
  input createArchiveInput {
    name: String!
    themeName: String
    address: String!
    lat: Float!
    lng: Float!
    organizer: String
    startDate: Date!
    endDate: Date!
    openTime: Date
    closeTime: Date
    mainImage: ID
    images:[ID]
    phoneNumber: String
    link: String
  }
  input updateArchiveInput {
    name: String!
    themeName: String!
    address: String!
    lat: Float!
    lng: Float!
    organizer: String!
    startDate: Date!
    endDate: Date!
    openTime: Date
    closeTime: Date
    mainImage: ID!
    images:[ID]
    phoneNumber: String
    link: String
  }
  input patchArchiveInput {
    name: String
    themeName: String
    address: String
    lat: Float
    lng: Float
    organizer: String
    startDate: Date
    endDate: Date
    openTime: Date
    closeTime: Date
    mainImage: ID
    images:[ID]
    phoneNumber: String
    link: String
  }

  type Mutation {
    createArchive (input: createArchiveInput!): Archive!
    updateArchive (id: ID!, input: updateArchiveInput!): Boolean
    patchArchive (id: ID!, input: patchArchiveInput!): Boolean
    removeArchive (id: ID!): Boolean
  }
`

module.exports = archiveTypeDefs
