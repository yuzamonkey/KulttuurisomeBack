const { gql } = require('apollo-server')
// const { DateTimeResolver } = require('graphql-scalars');

// const typeDefs = [
//   DateTimeResolver,
//   // other typeDefs
// ];

const typeDefs = gql`
  scalar Date

  type Jobquery {
    id: String!
    content: String!
    date: Date!
    user: User!
  }

  type User {
    id: ID!
    username: String!
    passwordHash: String!
    jobQueries: [Jobquery]
  }

  type Token {
    value: String!
  }

  type Query {
    queryCount: Int!
    allQueries: [Jobquery]
    allUsers: [User]
    findQueries(content: String!): [Jobquery],
    findUser(id: ID!): User
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
    createQuery(
      content: String!
    ): Jobquery
  }
`

module.exports = typeDefs