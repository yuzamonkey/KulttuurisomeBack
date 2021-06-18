export {}; //https://medium.com/@muravitskiy.mail/cannot-redeclare-block-scoped-variable-varname-how-to-fix-b1c3d9cc8206
require('dotenv').config()
const jwt = require('jsonwebtoken')

const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const User = require('./models/user');

//const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

const JWT_SECRET = process.env.JWT_SECRET

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error:any) => {
    console.log('error connection to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs, //sovelluksen GQL-skeema
  resolvers, //resolverit, eli koodi joka määrittelee miten kyselyihin vastataan
  context: async ({ req }: any) => {
    const auth = req ? req.headers.authorization : null
    console.log("AUTH", auth)
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      console.log("YES, STARTS WITH bearer")
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      console.log("YES, CURRENT USER", currentUser)
      console.log()
      return { currentUser }
    }
  }
})

server.listen().then(({ url }: any) => {
  console.log(`Server ready at ${url}`)
})
