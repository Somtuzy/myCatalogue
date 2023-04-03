import express from 'express'
import router from './routers/route'
import connectDatabase from './config/db.config'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'

// Getting access to the .env file for the database link & port
import dotenv from 'dotenv'
dotenv.config()

const Uri = process.env.MONGODB_URI as string
const PORT: number = parseFloat(process.env.PORT as string)

const app = express()

// Allows us to send and receive json files 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(morgan('common'))
app.use(helmet())

// Allows us to access a user's token stored as a cookie
app.use(cookieParser())

// Lets the server listen on all files
app.use("/api", router)

// Define a health check route that responds with a 200 status code
app.get('/health', (req, res) => {
  res.status(200).send('Relax, brov. Everything is alright..');
});

// Our port processed from the env file
const port = PORT || 3939

// Server listening for requests
app.listen(port, () => {
  connectDatabase(Uri as string)
  console.log(`Server connected on port ${port}`)
})
