const express = require("express")
const {Room, RoomType} = require("../collection/schema")
const router = express.Router()
router.use(express.json())
router.use(express.urlencoded({extended: true}))

// Create a new room using a new or existing roomtype 
router.post('/api/v1/rooms/create', async (req, res) => {
    let roomCodeName = req.body.codeName, roomPrice = req.body.price, roomTypeName = req.body.type, 
    roomTypeAmenities = req.body.amenities, roomTypedescription = req.body.description;
    const roomType = await RoomType.findOneAndUpdate(
        {name: roomTypeName},
        {name: roomTypeName, description: roomTypedescription, amenities: [roomTypeAmenities]},
        {upsert: true, new: true }
    )
    try {
        const room = new Room({
            codeName: roomCodeName,
            type: roomType._id,
            price: roomPrice
        })
        const result = await room.save()
        res.status(200).send(result)
        console.log(result);
    } catch (err) {
            err => console.log(err)
    }
})

// Get a room with its codename
router.get('/api/v1/rooms/:codename', async (req, res) => {
    let roomCodeName = req.params.codename.substring(1)
   const room = await Room.findOne({name: roomCodeName}).populate("type")
    try {
        res.send(room)
        console.log(room)    
    } catch(err) {
        console.log(err)
    } 
})

// Get all rooms
router.get('/api/v1/rooms', async (req, res) => {
   try{
        const room = await Room.find().populate("type")
        res.send(room)
        console.log(room);
   } catch (err) {
        console.log(err);
   }
})

// Edit a room
router.patch('/api/v1/rooms/:codename', async (req, res) => {
    const roomCodeName = req.params.codename.substring(1)
    const {codeName, price} = req.body
    try{
         const oldRoom = await Room.findOne({codeName: roomCodeName})
         const newRoom = await Room.findOneAndUpdate({codeName: roomCodeName}, {codeName: codeName, price: price}, {new: true})
         res.send(`${oldRoom} was updated to ${newRoom}`)
    } catch (err) {
        console.log(err);
    }
 })

// Delete a room
router.delete('/api/v1/rooms/:codename', async (req, res) => {
    const roomCodeName = req.params.codename.substring(1)
    console.log(roomCodeName);
    try{
         const room = await Room.findOneAndDelete({code: roomCodeName})
         res.send(`${room} was deleted.`)
         console.log(`${room} was deleted.`);
    } catch (err) {
        console.log(err);
    }
 })

// Finding a room with its room type, name, minimum price and maximum price
router.get('/rooms', async (req, res) => {
    const search = req.query.name
    const codeName = req.query.codeName
    const minPrice = req.query.minPrice
    const maxPrice = req.query.maxPrice
    console.log(search, codeName, minPrice, maxPrice);

    let filter = {}
    if (search) {
        filter.name = {$regex: search, $options: 'i'}
    }
    if (codeName) {
        filter.codeName = {$regex: codeName, $options: 'i'}
    }
    if (minPrice && maxPrice) {
        filter.price = {$gte: minPrice, $lte: maxPrice}
    } else if (minPrice) {
        filter.price = {$gte: minPrice}
    } else if (maxPrice) {
        filter.price = {$lte: maxPrice}
    }
    const room = await Room.find(filter)
    try {
        res.send(room)
        console.log(room)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;