const Chat = require("../models/chatModel")
const User = require("../models/userModel")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")


exports.accessChat = catchAsync(async (req, res, next) => {

    const { userId } = req.body

    if (!userId) return next(new AppError("No user id provided", 400))

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate("users", "-hash -salt").populate("latestMessage")

    isChat = await User.populate(isChat, { path: "latestMessage.sender", select: "username" })

    if (isChat.length > 0) {

        res.send(isChat[0])
    } else {
        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        }

        try {
            const createdChat = await Chat.create(chatData)

            const fullChat = await Chat.findById(createdChat._id).populate("users", "-hash -salt")

            res.status(200).send(fullChat)
        } catch (error) {
            return next(new AppError(error.message, 400))

        }
    }

})


exports.fetchChats = catchAsync(async (req, res, next) => {
    try {
        const response = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-hash -salt")
            .populate("latestMessage")
            .populate("groupAdmin", "-hash -salt")
            .sort({ updatedAt: -1 })

        results = await User.populate(response, { path: "latestMessage.sender", select: "username" })

        res.status(200).send(results)

    } catch (error) {
        console.log(error)
        return next(new AppError(error.message, 400))
    }
})


exports.createGroupChat = catchAsync(async (req, res, next) => {

    const users = JSON.parse(req.body.users)

    try {
        const groupChat = await Chat.create({
            users,
            isGroupChat: true,
            chatName: req.body.name,
            groupAdmin: req.user
        })

        console.log(groupChat);

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-hash -salt")
            .populate("groupAdmin", "-hash -salt")

        res.status(200).json(fullGroupChat)


    } catch (error) {
        console.log(error)
        return next(new AppError(error.message, 400))
    }

})

exports.renameGroup = catchAsync(async (req, res, next) => {

    const { chatId, name } = req.body


    const updatedChat = await Chat.findByIdAndUpdate(chatId,
        { chatName: name },
        { new: true })
        .populate("users", "-hash -salt")
        .populate("groupAdmin", "-hash -salt")

    if (!updatedChat) return next(new AppError("No chat found", 404))

    res.status(200).json(updatedChat)
})