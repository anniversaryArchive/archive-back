const { gql } = require('apollo-server');

const artistTypeDefs = gql`
  type Query {
    artists:[Artist]
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
  input ArtistInput {
    name: String!
    debutDate: Date!
    birthDay: Date!
    group: ID
  }
  type Mutation {
    createArtist (input: ArtistInput!): Artist!
  }
`

module.exports = artistTypeDefs
