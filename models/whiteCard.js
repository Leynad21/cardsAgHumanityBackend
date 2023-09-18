const mongoose = require('mongoose');

const whiteCardSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        unique: true,
    },
});

const WhiteCard = mongoose.model('WhiteCard', whiteCardSchema)

module.exports = WhiteCard
