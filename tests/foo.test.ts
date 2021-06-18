const mongoose = require('mongoose')
const supertest = require('supertest')
// const app = require('../app')

// const api = supertest(app)

test('something test', async () => {
  const kolme = 3
  expect(kolme).toBe(3)
})

afterAll(() => {
  mongoose.connection.close()
})