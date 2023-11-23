const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');



exports.getAllUsers = catchAsync(async function (req, res, next) {

    const keyword = req.query.search ? {
        username: { $regex: req.query.search, $options: 'i' }
    } : {}

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })

    res.status(200).json({
        success: true,
        users: users
    });
})