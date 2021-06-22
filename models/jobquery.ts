export {};
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const jobquerySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date, 
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

jobquerySchema.set('toJSON', {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

jobquerySchema.plugin(uniqueValidator)

module.exports = mongoose.model('Jobquery', jobquerySchema)