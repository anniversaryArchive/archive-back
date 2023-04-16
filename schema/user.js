const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type Query {
    users: [User]
  }

  type User {
    _id: ID
    name: String
    email: String
    provider: String
    providerId: String
    token: String
    image: String
  }

  type Mutation {
    signIn (accessToken: String!, provider: String): User
    signUp (accessToken: String!, provider: String): User
    withdraw (id: ID!): Boolean
  }
`;

module.exports = userTypeDefs;