const { model,Schema } = require('mongoose')
const RoomType = require('./roomtype.model')

const roomSchema = new Schema({
    codename: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    roomtype: {
        type: Schema.Types.ObjectId,
        ref: RoomType,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const roomModel = model("room", roomSchema)
module.exports = roomModel;