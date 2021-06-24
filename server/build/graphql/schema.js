"use strict";
const { gql } = require('apollo-server');
const typeDefs = gql `
  scalar Date

  type Message {
    id: ID!
    body: String
    sender: User!
  }

  type Conversation {
    id: ID!
    users: [User]!
    messages: [Message]!
  }

  type Jobquery {
    id: ID!
    content: String!
    date: Date!
    user: User!
  }

  type User {
    id: ID!
    username: String!
    passwordHash: String!
    jobQueries: [Jobquery]
    conversations: [Conversation]!
  }

  type Token {
    value: String!
  }

  type Query {
    allJobqueries: [Jobquery]
    allUsers: [User]
    findJobqueries(content: String!): [Jobquery],
    findUser(id: ID!): User
    allConversations: [Conversation]
    findConversation(id: ID!): Conversation
    me: User,
  }

  type Mutation {
    createUser(
      username: String!,
      password: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    createJobquery(
      content: String!
    ): Jobquery
    createConversation(
      receiverId: ID!
    ): Conversation
    sendMessage(
      conversationId: ID!
      body: String!
    ): Conversation
  }
`;
module.exports = typeDefs;
