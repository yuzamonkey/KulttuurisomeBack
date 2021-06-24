"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const conversationSchema = new mongoose.Schema({
    users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    messages: [{
            body: String,
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }]
});
conversationSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
conversationSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Conversation', conversationSchema);
