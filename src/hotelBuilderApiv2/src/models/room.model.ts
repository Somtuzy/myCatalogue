import { model,Schema } from 'mongoose'
import RoomType from './roomtype.model'

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
export default roomModel;