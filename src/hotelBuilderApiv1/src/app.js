const express = require('express')
const router = require('./routers/route')
const connectDatabase = require('./config/db.config')
const cookieParser = require('cookie-parser')

// Getting access to the .env file for the database link & port
require("dotenv").config()
const Uri = process.env.MONGODB_URI

const app = express()

// Allows us to send and receive json files 
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Allows us to access a user's token stored as a cookie
app.use(cookieParser())

// Lets the server listen on all files
app.use("/api", router)

// Our port processed from the env file
const port = parseFloat(process.env.PORT) || 3939

// Server listening for requests
app.listen(port, () => {
    connectDatabase(Uri)
    console.log(`Server connected on port ${port}`)
})
