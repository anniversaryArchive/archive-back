const { gql } = require('apollo-server-express');

const favoriteGroupTypeDefs = gql`
  type Query {
    FavoriteGroupList: [FavoriteGroup]
  }

  type FavoriteGroup {
    _id: ID
    createdAt: Date
    updatedAt: Date
    title: String
    description: String
    color: String
    archives: [Archive]
  }

  input FavoriteGroupInput {
    title: String!
    description: String
    color: String
    archives: [ID]
  }

  type Mutation {
    createFavoriteGroup(input: FavoriteGroupInput!): FavoriteGroup
    addArchive(id: ID!, archive: ID!): Boolean
    removeArchive(id: ID!, archive: ID!): Boolean
    updateArchives(id: ID!, archives: [ID]!): Boolean
  }
`;

module.exports = favoriteGroupTypeDefs;
