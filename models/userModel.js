const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please insert username'],
        unique: true,
    },
    hash: String,
    salt: String
});

const User = mongoose.model('User', UserSchema);


module.exports = User