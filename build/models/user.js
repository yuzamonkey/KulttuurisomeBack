"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    passwordHash: {
        type: String,
        required: true,
        minlength: 3
    },
    jobQueries: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Jobquery'
        }],
    conversations: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation'
        }]
});
schema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash;
    }
});
schema.plugin(uniqueValidator);
const User = mongoose.model('User', schema);
module.exports = User;
