const express = require('express')
const cardController = require('../controllers/cardController')
const authController = require('../controllers/authController')


const router = express.Router()

// Protect all routes after this middleware
router.use(authController.protect);

// Black Cards routes

router.route("/black")
    .get(cardController.getAllBlackCards)
    .post(cardController.createBlackCard)


router.route("/black/:id")
    .get(cardController.getBlackCard)
    .patch(cardController.updateBlackCard)
    .delete(cardController.deleteBlackCard)




// White Cards routes

router.route("/white")
    .get(cardController.getAllWhiteCards)
    .post(cardController.createWhiteCard)

router.route("/white/:id")
    .get(cardController.getWhiteCard)
    .patch(cardController.updateWhiteCard)
    .delete(cardController.deleteWhiteCard)



module.exports = router