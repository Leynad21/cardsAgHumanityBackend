const mongoose = require('mongoose')
const dotenv = require('dotenv').config({ path: './config.env' })


process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    process.exit(1)
})

const app = require('./app')

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
})
    .then(con => { console.log("DB connection successful") })
    .catch((err) => {
        console.error("DB connection error:", err);
    });



const port = process.env.PORT || 8000
const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
})


process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log("UNHANDLADED REJECTION! 💥 Shutting down...");
    server.close(() => {
        process.exit(1)
    })
})

