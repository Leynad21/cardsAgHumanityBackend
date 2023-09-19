const express = require('express')
const morgan = require('morgan')

const globalErrorHandler = require("./middleware/errorMiddleware")
const cardRouter = require('./routes/cardRoutes')



const app = express()


// 1) GLOBAL MIDDLEWARES

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Body parser, reading data from the body into req.body
app.use(express.json({
    limit: '10kb'
}))




// 2) ROUTES

app.use('/api/v1/cards', cardRouter)

app.get("/", (req, res) => {
    res.status(200).json({
        status: 'success',
        message: "Hello World"
    })
})


app.use(globalErrorHandler)


module.exports = app