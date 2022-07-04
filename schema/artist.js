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
  }
  input createArtistInput {
    name: String!
    debutDate: Date!
    birthDay: Date!
    group: ID
    image: ID
  }
  input updateArtistInput {
    name: String
    debutDate: Date
    birthDay: Date
    group: ID
    image: ID
  }
  type Mutation {
    createArtist (input: createArtistInput!): Artist!
    updateArtist (id: ID!, input: updateArtistInput!): Artist
    patchArtist (id: ID!, input: updateArtistInput!): Boolean
    removeArtist (id: ID!): Boolean
  }
`

module.exports = artistTypeDefs
