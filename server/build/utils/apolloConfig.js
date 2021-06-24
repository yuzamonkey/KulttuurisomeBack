"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../graphql/schema');
const resolvers = require('../graphql/resolvers');
const User = require('../models/user');
const JWT_SECRET = process.env.JWT_SECRET;
const app = express();
// TODO, maybe not optimal for browser caching
const frontendRoutes = [
    '/',
    '/signin',
    '/signup',
    '/messages',
    '/messages/:id',
    '/jobmarket/queries',
    '/jobmarket/sendquery',
    '/jobmarket/myqueries',
];
frontendRoutes.forEach(route => app.use(route, express.static("public")));
//app.use("/", express.static("public"));
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
            const currentUser = await User
                .findById(decodedToken.id);
            const time = new Date();
            console.log(currentUser.username, "is logged in at", time, "\n");
            return { currentUser };
        }
        else {
            return null;
        }
    },
    playground: true
});
server.applyMiddleware({ app });
const PORT = process.env.PORT || 5000;
// app.listen(PORT).then(({ url }: any) => {
//   console.log("PORT:", PORT )
//   console.log(`Server ready at ${url}`)
// })
app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
module.exports = {
    app,
    server
};
