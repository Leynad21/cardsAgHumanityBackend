const router = require("express").Router()
const authController = require("../controllers/authController")
const messageController = require("../controllers/messageController")


// Protect routes
router.use(authController.protect)

router.route("/").post(messageController.sendMessage)

router.route("/:chatId").get(messageController.getAllMessages)


module.exports = router