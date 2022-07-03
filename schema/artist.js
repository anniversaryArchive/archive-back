const { gql } = require('apollo-server');

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
  }
  input createArtistInput {
    name: String!
    debutDate: Date!
    birthDay: Date!
    group: ID
  }
  input updateArtistInput {
    name: String
    debutDate: Date
    birthDay: Date
    group: ID
  }
  type Mutation {
    createArtist (input: createArtistInput!): Artist!
    updateArtist (id: ID!, input: updateArtistInput!): Artist
    patchArtist (id: ID!, input: updateArtistInput!): Boolean
    removeArtist (id: ID!): Boolean
  }
`

module.exports = artistTypeDefs
