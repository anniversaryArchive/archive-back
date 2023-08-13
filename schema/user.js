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

  type ProviderInfo {
    id: String
    email: String
    name: String
    provider: String
  }

  type Auth {
    user: User
    token: String
    info: ProviderInfo
  }

  type Mutation {
    signIn (code: String!, provider: String): Auth
    signInTest (token: String!): Auth
    signUp (code: String!, provider: String): User
    withdraw (id: ID!): Boolean
  }
`;

module.exports = userTypeDefs;