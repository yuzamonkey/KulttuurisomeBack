export { };

require('dotenv').config()
const mongoose = require('mongoose')

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

try {
  console.log('connecting to', MONGODB_URI)
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
    .then(() => {
      console.log('connected to MongoDB')
    })
} catch (error) {
  console.log('error connection to MongoDB:', error.message)
}

module.exports = {
  MONGODB_URI
}