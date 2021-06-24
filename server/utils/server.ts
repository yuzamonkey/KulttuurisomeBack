import express from 'express';
import { createConfig } from './apolloConfig';

const app = express()
const { ApolloServer } = require('apollo-server-express')

// TODO, 
// may not optimal for browser caching
const frontendRoutes = [
  '/', 
  '/signin', 
  '/signup', 
  '/messages', 
  '/messages/:id', 
  '/jobmarket/queries',
  '/jobmarket/sendquery',
  '/jobmarket/myqueries',
]
frontendRoutes.forEach(route => app.use(route, express.static("public")))

const server = new ApolloServer(createConfig())

server.applyMiddleware({ app });

const PORT = process.env.PORT || 5000

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
)