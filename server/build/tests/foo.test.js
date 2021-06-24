"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const mongoose = require('mongoose');
const connectTestingDB = require('../utils/testingEnvironment').connectDB;
//const apolloConfig = require('../utils/apolloConfig
beforeAll(async () => {
    await connectTestingDB();
});
afterAll(async () => {
    await mongoose.connection.close();
    console.log(apolloConfig.server);
});
test('something test', async () => {
    const kolme = 3;
    expect(kolme).toBe(3);
});
describe('connections are up and running', () => {
    test('correct database name', async () => {
        const connectionName = await mongoose.connection.name;
        expect(connectionName).toBe(process.env.TEST_DB_NAME);
    });
});
// describe('creating user', () => {
//   test('create user', async () => {
//     const username = 'testUser'
//     const password = 'password'
//   })
// })
