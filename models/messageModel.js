const mongoose = require('mongoose')


const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A message must have a sender'],
    },
    content: {
        type: String,
        trim: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: [true, 'A message must have a chat'],
    },
},
    { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message