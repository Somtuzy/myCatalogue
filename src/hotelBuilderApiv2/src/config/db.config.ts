import mongoose from 'mongoose'
mongoose.set('strictQuery', true)

// Connects to the database
const connect = (Uri: string): void => {
    mongoose
    .connect(Uri, {
    dbName: "hotelBuilder",
    useNewUrlParser: true,
    useUnifiedTopology: true
} as mongoose.ConnectOptions)
.then(() => console.log('Connected to your database'))
.catch((err: any) => console.log(err,':', err.message))
}

export default connect