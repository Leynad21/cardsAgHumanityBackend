const BlackCard = require("../models/blackCardModel")
const WhiteCard = require("../models/whiteCardModel")
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
    const blackCard = await BlackCard.create({
        ...req.body,
        createdBy: req.user._id,
    })


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
exports.getAllWhiteCards = async (req, res, next) => {

    const whiteCards = await WhiteCard.find()

    res.status(200).json({
        status: 'success',
        cards: {
            type: 'white',
            cards: whiteCards
        }
    })
    next()
}


//@desc    create a white card
//@route   api/v1/cards/white
//@access  private
exports.createWhiteCard = catchAsync(async (req, res, next) => {
    const whiteCard = await WhiteCard.create({
        ...req.body,
        createdBy: req.user._id,
    })


    res.status(201).json({
        status: 'success',
        data: {
            type: 'white',
            text: whiteCard
        }
    })
})



//@desc    get a white card
//@route   api/v1/cards/white/:id
//@access  private
exports.getWhiteCard = catchAsync(async (req, res, next) => {

    const whiteCard = await WhiteCard.findById(req.params.id)

    if (!whiteCard) return next(new AppError("No White card find with that id", 404))

    res.status(200).json({
        status: 'success',
        data: {
            type: 'white',
            card: whiteCard
        }
    })
})


//@desc    update a white card
//@route   api/v1/cards/white/:id
//@access  private
exports.updateWhiteCard = catchAsync(async (req, res, next) => {
    const whiteCard = await WhiteCard.findById(req.params.id)

    if (!whiteCard) return next(new AppError("No White card find with that id", 404))

    whiteCard.text = req.body.text
    whiteCard.save()

    res.status(200).json({
        status: 'success',
        data: {
            type: 'white',
            card: whiteCard
        }
    })
})


//@desc    delete a white card
//@route   api/v1/cards/white/:id
//@access  private
exports.deleteWhiteCard = catchAsync(async (req, res, next) => {
    await WhiteCard.findByIdAndDelete(req.params.id)

    res.status(204).json({
        status: 'success',
        data: null
    })
})