const { gql } = require('apollo-server-express');

const favoriteGroupTypeDefs = gql`
  type Query {
    FavoriteGroupList: [FavoriteGroup]
    FavoriteGroup(id: ID!): FavoriteGroup
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
    addArchiveInFavoriteGroup(id: ID!, archive: ID!): Boolean
    removeArchiveInFavoriteGroup(id: ID!, archive: ID!): Boolean
    updateArchives(id: ID!, archives: [ID]!): Boolean
  }
`;

module.exports = favoriteGroupTypeDefs;
