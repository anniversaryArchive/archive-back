const { gql } = require('apollo-server-express');

const fileTypeDefs = gql`
  type Query {
    files: [File]
    file (id: ID!): File
  }
  type File {
    _id: ID
    createdAt: Date
    updatedAt: Date
    name: String
    mimetype: String
    size: Int
    path: String
  }
`;

module.exports = fileTypeDefs;
