import { model,Schema } from 'mongoose'

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
}, {timestamps: true})

const userModel = model("user", userSchema)
export default userModel;