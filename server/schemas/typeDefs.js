const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    reviews: [Review]!
  }

  type Review {
    _id: ID!
    reviewText: String!
    reviewAuthor: String!
    createdAt: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    reviews(username: String): [Review]
    review(_id: ID!): Review
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addReview(reviewText: String!): Review
    removeReview(reviewId: ID!): Review
  }
`;

module.exports = typeDefs;
