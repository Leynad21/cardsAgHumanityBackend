const mongoose = require('mongoose');
const router = require('express').Router();
// const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../utils/utils');
const User = require("../models/userModel")
const authController = require('../controllers/authController')


router.get('/protected', authController.protect, (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!" });
});


router.post('/login', authController.login);
router.post('/register', authController.register)
router.post('/logout', authController.logout)
router.get('/:username', authController.getUser)

module.exports = router;