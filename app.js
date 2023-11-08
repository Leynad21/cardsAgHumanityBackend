const express = require('express')
const morgan = require('morgan')
// const cors = require('cors')
const path = require('path')
const passport = require('passport')


const globalErrorHandler = require("./middleware/errorMiddleware")
const cardRouter = require('./routes/cardRoutes')
const userRouter = require('./routes/userRoutes')



const app = express()


// 1) GLOBAL MIDDLEWARES

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Must first load the models
require('./models/user');

// Pass the global passport object into the configuration function
require('./config/passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// Body parser, reading data from the body into req.body
app.use(express.json({
    limit: '10kb'
}))

// Allows our Frontend application to make HTTP requests to Express application
// app.use(cors());


// 2) ROUTES

app.use('/api/v1/cards', cardRouter)
app.use('/api/v1/user', userRouter);


app.get("/", (req, res) => {
    res.status(200).json({
        status: 'success',
        message: "Hello World"
    })
})


app.use(globalErrorHandler)


module.exports = app