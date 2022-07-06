const { gql } = require('apollo-server-express');

const imageTypeDefs = gql`
  type Query {
    images: [Image]
    image (id: ID!): Image
  }
  type Image {
    _id: ID
    createdAt: Date
    updatedAt: Date
    name: String
    desc: String
    filename: String
    mimetype: String
  }
`;

module.exports = imageTypeDefs;
