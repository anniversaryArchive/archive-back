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
    signIn (code: String!, provider: String): Auth
    signUp (code: String!, provider: String): User
    withdraw (id: ID!): Boolean
  }
`;

module.exports = userTypeDefs;