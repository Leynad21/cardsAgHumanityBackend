const express = require('express')

const cardRouter = require('./routes/cardRoutes')



const app = express()


// 1) GLOBAL MIDDLEWARES





// 2) ROUTES

app.use('/api/v1/cards', cardRouter)






module.exports = app