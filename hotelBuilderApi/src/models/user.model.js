const { model,Schema } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    fullname: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        lowercase: true,
        required: true,
        enum: ['guest', 'admin'],
        default: 'guest'
    },
    age: {
        type: Number,
        required: true,
        min: 18
    }
})

const userModel = model("user", userSchema)
module.exports = userModel;