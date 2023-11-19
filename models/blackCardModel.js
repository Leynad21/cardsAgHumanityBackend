const mongoose = require('mongoose');

const blackCardSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        unique: true,
    },
    pick: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A black card must have a user'],
    },
});

const BlackCard = mongoose.model('BlackCard', blackCardSchema);

module.exports = BlackCard
