const { gql } = require('apollo-server-express');

const communicationBoardTypeDefs = gql`
  type Query {
    CommunicationBoard (id: ID!): CommunicationBoard
    CommunicationBoardPagination (page: Int, perPage: Int, sortField: String, sortOrder: Int, filter: FilterOption): CommunicationBoardPage
  }
  type CommunicationBoardPage {
    data: [CommunicationBoard]
    total: Int
  }

  enum CommunicationBoardDivision {
    notice
    group
    artist
    archive
    improvement
    error
  }
  enum CommunicationBoardStatus {
    none
    request
    accept
    reject
  }
  type CommunicationBoard {
    _id: ID
    seq: Int
    createdAt: Date
    updatedAt: Date
    division: CommunicationBoardDivision
    title: String
    content: String
    author: User
    data: Object
    fixed: Boolean
    status: CommunicationBoardStatus
    message: String
  }

  input CommunicationBoardInput {
    division: CommunicationBoardDivision!
    title: String!
    content: String
    group: createGroupInput
    artist: createArtistInput
    archive: createArchiveInput
    fixed: Boolean
    status: CommunicationBoardStatus
  }

  input patchCommunicationBoardInput {
    division: CommunicationBoardDivision
    title: String
    content: String
    group: createGroupInput
    artist: createArtistInput
    archive: createArchiveInput
    fixed: Boolean
    status: CommunicationBoardStatus
  }

  type Mutation {
    createCommunicationBoard (input: CommunicationBoardInput!): CommunicationBoard
    updateCommunicationBoard (id: ID!, input: CommunicationBoardInput!): Boolean
    patchCommunicationBoard (id: ID!, input: patchCommunicationBoardInput!): Boolean
    removeCommunicationBoard (id: ID!): Boolean
    acceptCommunicationBoard (id: ID!, message: String): Boolean
    rejectCommunicationBoard (id: ID!, message: String!): Boolean
    reRequestCommunicationBoard (id: ID!): Boolean
  }
`

module.exports = communicationBoardTypeDefs
