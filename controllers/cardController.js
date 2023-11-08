const BlackCard = require("../models/blackCardModel")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")


// Black Cards Controller

//@desc    get all black cards
//@route   api/v1/cards/black
//@access  private
exports.getAllBlackCards = catchAsync(async (req, res, next) => {

    const blackCards = await BlackCard.find()

    res.status(200).json({
        status: 'success',
        cards: {
            type: 'black',
            cards: blackCards
        }
    })
})

//@desc    create a black card
//@route   api/v1/cards/black
//@access  private
exports.createBlackCard = catchAsync(async (req, res, next) => {
    const blackCard = await BlackCard.create(req.body)


    res.status(201).json({
        status: 'success',
        data: {
            type: 'black',
            text: blackCard
        }
    })
})

//@desc    get a black card
//@route   api/v1/cards/black/:id
//@access  private
exports.getBlackCard = catchAsync(async (req, res, next) => {

    const blackCard = await BlackCard.findById(req.params.id)

    if (!blackCard) return next(new AppError("No Black card find with that id", 404))

    res.status(200).json({
        status: 'success',
        data: {
            type: 'black',
            card: blackCard
        }
    })
})

//@desc    update a black card
//@route   api/v1/cards/black/:id
//@access  private
exports.updateBlackCard = catchAsync(async (req, res, next) => {
    const blackCard = await BlackCard.findById(req.params.id)

    if (!blackCard) return next(new AppError("No Black card find with that id", 404))

    blackCard.text = req.body.text
    blackCard.save()

    res.status(200).json({
        status: 'success',
        data: {
            type: 'black',
            card: blackCard
        }
    })
})

//@desc    delete a black card
//@route   api/v1/cards/black/:id
//@access  private
exports.deleteBlackCard = catchAsync(async (req, res, next) => {
    await BlackCard.findByIdAndDelete(req.params.id)

    res.status(204).json({
        status: 'success',
        data: null
    })
})

// White Cards Controller

//@desc    get all white cards
//@route   api/v1/cards/white
//@access  private
exports.getAllWhiteCards = (req, res, next) => {

    next()
}



