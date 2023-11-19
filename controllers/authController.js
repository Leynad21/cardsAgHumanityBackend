const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const utils = require('../utils/utils');
const User = require("../models/userModel")
const catchAsync = require("../utils/catchAsync")

// Validate an existing user and issue a JWT
exports.login = catchAsync(async function (req, res, next) {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
        return res.status(401).json({ success: false, msg: "Could not find user" });
    }

    // Checks if password is correct
    const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

    if (isValid) {
        const tokenObject = utils.issueJWT(user);
        res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires, user: user.username });
    } else {
        res.status(401).json({ success: false, msg: "You entered the wrong password" });
    }
})

exports.register = catchAsync(async function (req, res, next) {
    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
        // A user with the same username already exists
        return res.status(400).json({ success: false, message: "This username already exists" });
    }

    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt
    });


    const user = await newUser.save();
    res.json({ success: true, user: user });
})

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
}

exports.getUser = catchAsync(async function (req, res, next) {
    const username = req.params.username; // username is passed as a URL parameter

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).json({ success: false, msg: "User not found" });
    }

    // exclude sensitive information (like hash and salt) before sending the user data
    const sanitizedUser = {
        id: user._id,
        username: user.username,
    };

    res.status(200).json({ success: true, user: sanitizedUser });
});


exports.protect = passport.authenticate('jwt', { session: false })