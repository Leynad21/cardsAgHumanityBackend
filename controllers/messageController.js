const Chat = require("../models/chatModel")
const User = require("../models/userModel")
const Message = require("../models/messageModel")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")



exports.sendMessage = catchAsync(async (req, res, next) => {

    const { content, chatId } = req.body

    if (!content || !chatId) return next(new AppError("Invalid data provided", 400))

    const newMessage = {
        sender: req.user._id,
        content,
        chat: chatId
    }

    try {
        let message = await Message.create(newMessage)

        message = await message.populate("sender", "username")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path: "chat.users",
            select: "username",
        })

        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message })

        res.status(200).json(message)

    } catch (error) {
        return next(new AppError(error.message, 400))
    }

})

exports.getAllMessages = catchAsync(async (req, res, next) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "username")
            .populate("chat")

        res.status(200).json(messages)
    } catch (error) {
        return next(new AppError(error.message, 400))
    }
})