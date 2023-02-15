const {model, Schema} = require("mongoose");
const ObjectId = Schema.Types.ObjectId

// Define the schema for the RoomType model
const RoomTypeSchema = new Schema({
    _id: {
      type: ObjectId
    },
    name: {
      type: String,
      required: [true, 'Please specify the roomtype name']
    },
  });

// Create the RoomType collection
const RoomType = model("RoomType", RoomTypeSchema)

module.exports = RoomType
