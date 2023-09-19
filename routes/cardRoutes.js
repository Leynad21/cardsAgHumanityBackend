const express = require('express')
const cardController = require('../controllers/cardController')


const router = express.Router()


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



module.exports = router