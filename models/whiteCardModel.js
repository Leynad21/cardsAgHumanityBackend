const mongoose = require('mongoose');

const whiteCardSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const WhiteCard = mongoose.model('WhiteCard', whiteCardSchema)

module.exports = WhiteCard
