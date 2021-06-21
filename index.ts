export { }; //https://medium.com/@muravitskiy.mail/cannot-redeclare-block-scoped-variable-varname-how-to-fix-b1c3d9cc8206
require('dotenv').config()
const jwt = require('jsonwebtoken')

const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

const User = require('./models/user');

const environmentUri = () => {
  if (process.env.NODE_ENV === 'test') {
    return process.env.TEST_MONGODB_URI
  } else if (process.env.NODE_ENV === 'development') {
    return process.env.DEV_MONGODB_URI
  } else {
    return process.env.MONGODB_URI
  }
}

const MONGODB_URI = environmentUri()

console.log('connecting to', MONGODB_URI)

const JWT_SECRET = process.env.JWT_SECRET

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error: any) => {
    console.log('error connection to MongoDB:', error.message)
  })

const server = new ApolloServer({
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

server.listen().then(({ url }: any) => {
  console.log(`Server ready at ${url}`)
})
