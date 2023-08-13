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
    image: String
  }

  type Auth {
    user: User
    token: String
  }

  type Mutation {
    signIn (accessToken: String!, provider: String): Auth
    signInTest (token: String!): Auth
    signUp (accessToken: String!, provider: String): User
    withdraw (id: ID!): Boolean
  }
`;

module.exports = userTypeDefs;