const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const passport = require('passport')
const dotenv = require('dotenv');



const globalErrorHandler = require("./middleware/errorMiddleware")
const cardRouter = require('./routes/cardRoutes')
const userRouter = require('./routes/userRoutes')
const chatRouter = require('./routes/chatRoutes')
const messageRouter = require('./routes/messageRoutes')

// Load env vars
dotenv.config();

const app = express()


// 1) GLOBAL MIDDLEWARES

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Must first load the models
require('./models/userModel');

// Pass the global passport object into the configuration function
require('./config/passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// Body parser, reading data from the body into req.body
app.use(express.json())

// Enable CORS
// Allows our Frontend application to make HTTP requests to Express application
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // enable cookies and credentials
};
app.use(cors(corsOptions));


// 2) ROUTES

app.use('/api/v1/cards', cardRouter)
app.use('/api/v1/users', userRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/messages', messageRouter);


app.get("/", (req, res) => {
    res.status(200).json({
        status: 'success',
        message: "Hello World"
    })
})


app.use(globalErrorHandler)


module.exports = app