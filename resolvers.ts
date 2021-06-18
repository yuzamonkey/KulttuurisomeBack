import { AuthenticationError, IResolvers, UserInputError } from "apollo-server"

require('dotenv')
const bcrypt = require('bcrypt')

const Jobquery = require('./models/jobquery')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

const JWT_SECRET = process.env.JWT_SECRET

const resolvers: IResolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date scalar (Jusa has done this)",
    parseValue(value: Date) {
      return new Date(value) //value from the client
    },
    serialize(value: Date) {
      return value //value sent to client
    },
    parseLiteral(ast: any) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value) //ast value is always in string format
      }
      return null
    }
  }),
  Query: {
    queryCount: () => Jobquery.collection.countDocuments(),
    allQueries: (root, args) => {
      return Jobquery.find({}).populate('user')
    },
    allUsers: (root, args) => {
      return User.find({}).populate('jobQueries')
    },
    findQueries: (root, args) =>
      Jobquery.find({ content: args.content }).populate('user'),
    findUser: (root, args) => {
      console.log("ID", args.id)
      return User.findOne({ _id: args.id }).populate('jobQueries')
    },
    me: (root, args, context) => {
      //return context.currentUser
      return User.findOne({ username: context.currentUser.username }).populate('jobQueries')
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const username = args.username

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(args.password, saltRounds)

      const user = new User({
        username: username,
        passwordHash: passwordHash
      })
      console.log(`NEW not saved USER: ${user}`)

      return user.save()
        .catch(error => {
          console.log("ERROR AT USER SAVE MUTATION")
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || await bcrypt.compare(args.password, user.passwordHash) === false) {
        console.log("WRONG CREDENTIALS")
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },

    createQuery: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        console.log(`Not authenticated user`)
        throw new AuthenticationError("not authenticated")
      }

      const content = args.content
      const date = new Date()
      const userId = currentUser.id
      console.log("USER ID IN CREATE QUERY RESOLVER", userId)

      const newQuery = new Jobquery({
        content: content,
        date: date,
        user: userId
      })

      console.log(`NEW JOBQUERY: ${newQuery}`)

      try {
        const foo = await newQuery.save()
        currentUser.jobQueries = currentUser.jobQueries.concat(newQuery)
        await currentUser.save()
        return foo
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      // return newQuery.save()
      //   .catch(error => {
      //     console.log("ERROR AT NEW QUERY")
      //     throw new UserInputError(error.message, {
      //       invalidArgs: args,
      //     })
      //   })
    }
  }
}

module.exports = resolvers