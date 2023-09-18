const express = require('express')
const cardController = require('../controllers/cardController')


const router = express.Router()


// Black Cards routes

router.route("/black")
    .get(cardController.getAllBlackCards)




// White Cards routes

router.route("/white")
    .get(cardController.getAllWhiteCards)



module.exports = router