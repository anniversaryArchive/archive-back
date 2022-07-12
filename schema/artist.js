const { gql } = require('apollo-server-express');

const artistTypeDefs = gql`
  type Query {
    artists: [Artist]
    artist (id: ID!): Artist
  }
  type Artist {
    _id: ID
    createdAt: Date
    updatedAt: Date
    name: String
    debutDate: Date
    birthDay: Date
    group: Group
    image: Image
    color: String
  }
  input createArtistInput {
    name: String!
    debutDate: Date!
    birthDay: Date!
    group: ID
    image: ID
    color: String
  }
  input updateArtistInput {
    name: String
    debutDate: Date
    birthDay: Date
    group: ID
    image: ID
    color: String
  }
  type Mutation {
    createArtist (input: createArtistInput!): Artist!
    updateArtist (id: ID!, input: updateArtistInput!): Boolean
    patchArtist (id: ID!, input: updateArtistInput!): Boolean
    removeArtist (id: ID!): Boolean
  }
`

module.exports = artistTypeDefs
