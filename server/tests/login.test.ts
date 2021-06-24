// import { createConfig } from '../utils/apolloConfig'
// import { ApolloServer } from 'apollo-server'
// import { gql } from 'apollo-server-core'
// const mongoose = require('mongoose')

// const MOCK_USERNAME = `mock-username-${Date.now()}`
// const MOCK_PASSWORD = `mock-password-${Date.now()}`

// const connectTestingDB = require('../utils/testingEnvironment').connectDB

// const DEBUG_QUERY = gql`
//     query {
//         getDebugValues  {
//             value
//         }
//     }
// `

// const CREATE_USER_MUTATION = gql`
//     mutation createUser($username: String!, $password: String!) {
//         createUser(username: $username, password: $password)  {
//             id
//         }
//     }
// `

// const LOGIN_MUTATION = gql`
//     mutation login($username: String!, $password: String!) {
//         login(username: $username, password: $password)  {
//             value
//         }
//     }
// `

// describe('login', () => {

//     let server: ApolloServer

//     const createMockUser = async () => {
//         await server.executeOperation({
//             query: CREATE_USER_MUTATION,
//             variables: {
//                 username: MOCK_USERNAME,
//                 password: MOCK_PASSWORD
//             }
//         })
//     }
    
//     const login = async (username: string, password: string) => {
//         const response = await server.executeOperation({
//             query: LOGIN_MUTATION,
//             variables: {
//                 username,
//                 password
//             }
//         })
//         return response.data?.value
//     }

//     const getDebugValues = () => {
//         return server.executeOperation({
//             query: DEBUG_QUERY
//         })
//     }

//     beforeAll(async () => {
//         await connectTestingDB() 
//         server = new ApolloServer(createConfig(async () => {
//             return {
//                 currentUser: 'TODUAYUOSYOSA'
//             }
//         }))
//         await server.listen()
//         const foo = await getDebugValues()
//         console.log(foo)
//         //await createMockUser()
//     })

//     afterAll(async () => {
//         await mongoose.connection.close()
//     })

//     it('happy path', async () => {
//         console.log('TODO')
//         //const accessToken = await login(MOCK_USERNAME, MOCK_PASSWORD)
//         //expect(accessToken).toBeDefined()
//     })

// })