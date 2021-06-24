//export { }; //https://medium.com/@muravitskiy.mail/cannot-redeclare-block-scoped-variable-varname-how-to-fix-b1c3d9cc8206

require('dotenv').config()

const typeDefs = require('../graphql/schema')
const resolvers = require('../graphql/resolvers')

const User = require('../models/user');

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const createAuthorizationContext = () => {
  const context = async ({ req }: any): Promise<{currentUser: any}|null> => { //An object (or a function that creates an object) that's passed to every resolver that executes for a particular operation
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
    } else {
      return null
    }
  }
  return context
}

export const createConfig = (context = createAuthorizationContext()) => {
  return {
    typeDefs, //sovelluksen GQL-skeema
    resolvers, //resolverit, eli koodi joka määrittelee miten kyselyihin vastataan
    context,
    playground: process.env.NODE_ENV !== 'production' ? true : false
  }
}