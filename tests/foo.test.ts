export { };

require('dotenv').config()
const jwt = require('jsonwebtoken')

const { ApolloServer } = require('apollo-server')


const mongoose = require('mongoose')
const typeDefs = require('../graphql/schema')
const resolvers = require('../graphql/resolvers')
const JWT_SECRET = process.env.JWT_SECRET
const User = require('../models/user');
const connectTestingDB = require('../utils/testingEnvironment').connectDB
//const apolloConfig = require('../utils/apolloConfig
const apolloServer = new ApolloServer({
  typeDefs, //sovelluksen GQL-skeema
  resolvers, //resolverit, eli koodi joka määrittelee miten kyselyihin vastataan
  context: async ({ req }: any) => { //An object (or a function that creates an object) that's passed to every resolver that executes for a particular operation
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      const time = new Date()
      console.log(currentUser.username, "is logged in at", time, "\n")
      return { currentUser }
    }
  }
})

beforeAll(async () => {
  await connectTestingDB()
})

afterAll(async () => {
  await mongoose.connection.close()
  console.log(apolloConfig.server)
})

test('something test', async () => {
  const kolme = 3
  expect(kolme).toBe(3)
})

describe('connections are up and running', () => {
  test('correct database name', async () => {
    const connectionName = await mongoose.connection.name
    expect(connectionName).toBe(process.env.TEST_DB_NAME)
  })
})

// describe('creating user', () => {
//   test('create user', async () => {
//     const username = 'testUser'
//     const password = 'password'

//   })
// })

