const router = require('express').Router();
const authController = require('../controllers/authController');
const chatController = require('../controllers/chatController');



// Protect all routes after this middleware
router.use(authController.protect);


// Chat Routes

router.route("/")
    .post(chatController.accessChat)
    .get(chatController.fetchChats)

router.route("/group").post(chatController.createGroupChat)
router.route("/rename").put(chatController.renameGroup)
// router.route("/groupRemove").put(chatController.removeFromGroup)
// router.route("/groupAdd").put(chatController.addGroup)




module.exports = router;