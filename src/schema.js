// src/schema.js

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Link {
    id: ID!
    description: String!
    url: String!
  }

  type Query {
    feed: [Link!]!
  }

  type Mutation {
    post(description: String!, url: String!): Link!
    deleteLink(id: ID!): Link!
  }
`;

module.exports = { typeDefs };
