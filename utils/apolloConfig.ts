export { }; //https://medium.com/@muravitskiy.mail/cannot-redeclare-block-scoped-variable-varname-how-to-fix-b1c3d9cc8206

require('dotenv').config()
const jwt = require('jsonwebtoken')

const { ApolloServer } = require('apollo-server')

const typeDefs = require('../graphql/schema')
const resolvers = require('../graphql/resolvers')

const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET

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
    } else {
      return null
    }
  },
  playground: true
})

const PORT = process.env.PORT || 5000
server.listen(PORT).then(({ url }: any) => {
  console.log("PORT:", PORT )
  console.log(`Server ready at ${url}`)
})

module.exports = {
  server
}
