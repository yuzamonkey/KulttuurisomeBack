"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('../graphql/schema');
const resolvers = require('../graphql/resolvers');
const User = require('../models/user');
const JWT_SECRET = process.env.JWT_SECRET;
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
    }
});
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
module.exports = {
    server
};
