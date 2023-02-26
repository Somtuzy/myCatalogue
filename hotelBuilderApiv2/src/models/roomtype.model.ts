import {model,Schema } from 'mongoose'

const roomTypeSchema = new Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true})

const roomTypeModel = model("roomtype", roomTypeSchema)
export default roomTypeModel;