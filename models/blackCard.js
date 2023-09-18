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
});

const BlackCard = mongoose.model('BlackCard', blackCardSchema);

module.exports = BlackCard
