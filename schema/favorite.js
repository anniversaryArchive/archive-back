const { gql } = require('apollo-server-express');

const favoriteTypeDefs = gql`
  type Query {
    FavoritePagination (page: Int, perPage: Int, sortField: String, sortOrder: Int, filter: FilterOption): FavoritePage
  }
  type Favorite {
    _id: ID
    createdAt: Date
    updatedAt: Date
    user: User
    archive: Archive
  }
  type FavoritePage {
    data: [Favorite]
    total: Int!
  }
  
  type Mutation {
    createFavorite (archive: ID!): Favorite
    removeFavorite (id: ID!): Boolean
  }
`;

module.exports = favoriteTypeDefs;