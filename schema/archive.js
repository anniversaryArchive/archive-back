const { gql } = require('apollo-server-express');

const archiveTypeDefs = gql`
  type Query {
    archives: [Archive]
    archive (id: ID!): Archive
    ArchivePagination (page: Int, perPage: Int, sortField: String, sortOrder: Int, filter: FilterOption, start: Date, end: Date): ArchivePage
  }
  type ArchivePage {
    data: [Archive]
    total: Int
  }
  type CustomTime {
    hour: Int
    minute: Int
  }
  input CustomTimeInput {
    hour: Int
    minute: Int
  }
  type Archive {
    _id: ID
    name: String
    themeName: String
    artist: Artist
    group: Group
    address: String
    detailAddress: String
    lat: Float
    lng: Float
    organizer: String
    startDate: Date
    endDate: Date
    openTime: CustomTime
    closeTime: CustomTime
    mainImage: File
    images:[File]
    phoneNumber: String
    link: String
    favorite: Boolean
  }
  input createArchiveInput {
    name: String!
    themeName: String
    artist: ID
    group: ID
    address: String!
    detailAddress: String
    lat: Float!
    lng: Float!
    organizer: String
    startDate: Date!
    endDate: Date!
    openTime: CustomTimeInput
    closeTime: CustomTimeInput
    mainImage: ID
    images:[ID]
    phoneNumber: String
    link: String
  }
  input updateArchiveInput {
    name: String!
    themeName: String!
    artist: ID
    group: ID
    address: String!
    detailAddress: String
    lat: Float!
    lng: Float!
    organizer: String!
    startDate: Date!
    endDate: Date!
    openTime: CustomTimeInput
    closeTime: CustomTimeInput
    mainImage: ID!
    images:[ID]
    phoneNumber: String
    link: String
  }
  input patchArchiveInput {
    name: String
    themeName: String
    artist: ID
    group: ID
    address: String
    detailAddress: String
    lat: Float
    lng: Float
    organizer: String
    startDate: Date
    endDate: Date
    openTime: CustomTimeInput
    closeTime: CustomTimeInput
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
