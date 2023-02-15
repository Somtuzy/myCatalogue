const {model, Schema} = require("mongoose")
const ObjectId = Schema.Types.ObjectId

// Creating the roomtype structure also known as schema
const RoomTypeSchema = new Schema({
    name: String,
    description: {
        type: String,
        required: [true, "Please describe your room type"]
    },
    amenities: []
})

// Modelling the roomtype collection to take on its structure above
const RoomType = model("roomtype", RoomTypeSchema)

// Creating the room structure also known as schema
const RoomSchema = new Schema({
    codeName: String,
    type: {
        type: ObjectId,
        ref: RoomType
    },
    price: Number
})

// Modelling the roomtype collection to take on its structure above
const Room = model("room", RoomSchema)

// Exporting the Collections so we can use their methods to create rooms and roomtypes
module.exports = {Room, RoomType}
