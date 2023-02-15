const express = require("express")
const mongoose = require("mongoose")
mongoose.set('strictQuery', true)
const roomRouter = require("../builder/room")
const roomTypeRouter = require("../builder/roomType")

// Getting access to the .env file for the database link
require("dotenv").config()
const Uri = process.env.DATABASE_URI

// Creating a server
const app = express()

// Allows us to send and receive json files 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Lets the server listen on all files
app.use(roomRouter)
app.use(roomTypeRouter)

// Connects to the database
mongoose.connect(Uri, {
    dbName: "hotel-california",
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('You are connected to your database'))
.catch(err => console.log(err,':', err.message))

// Server listening for requests
app.listen(3000, () => console.log('You are connected to port 3000 on your server'))
