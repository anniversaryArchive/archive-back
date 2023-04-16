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
  
  input FavoriteInput {
    user: ID!
    archive: ID!
  }
  type Mutation {
    createFavorite (input: FavoriteInput!): Favorite
    removeFavorite (id: ID!): Boolean
  }
`;

module.exports = favoriteTypeDefs;
