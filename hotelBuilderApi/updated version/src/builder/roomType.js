const {RoomType} = require("../collection/schema")
const router = require("express").Router()

// Create a new roomtype
router.post('/api/v1/room-types/create', async (req, res) => {
    let roomTypeName = req.body.name, roomTypeAmenities = req.body.amenities;
    try {
        const roomType = new RoomType({
            name: roomTypeName,
            description: req.body.description,
            amenities: [roomTypeAmenities]
        })
        const result = await roomType.save()
        res.send(result)
        console.log(result);
    } catch (err) {
        err => console.log(err)
    }
})

// Get a roomtype with its name
router.get('/api/v1/room-types/:name', async (req, res) => {
    let roomTypeName = req.params.name.substring(1)
   const roomType = await RoomType.findOne({name: roomTypeName})
    try {
        res.send(roomType)
        console.log(roomType)    
    } catch(err) {
        console.log(err)
    } 
})

// Get all roomtypes
router.get('/api/v1/room-types', async (req, res) => {
    try{
         const roomTypes = await RoomType.find()
         res.send(roomTypes)
         console.log(roomTypes);
    } catch (err) {
         console.log(err);
    }
 })

 // Edit a roomtype
router.patch('/api/v1/room-types/:name', async (req, res) => {
    const roomTypeName = req.params.name.substring(1)
    const {newName, newDescription} = req.body
    console.log(roomCodeName);
    try{
         const oldRoomType = await RoomType.findOne({name: roomTypeName})
         const newRoomType = await RoomType.findOneAndUpdate({name: roomTypeName}, {name: newName, description: newDescription}, {new: true})
         res.send(`${oldRoomType} was updated to ${newRoomType}`)
         console.log(`${oldRoomType} was updated to ${newRoomType}`);
    } catch (err) {
        console.log(err);
    }
 })

 // Deleting a roomtype
router.delete('/api/v1/room-types/:name', async (req, res) => {
    const roomTypeName = req.params.name.substring(1)
    console.log(roomTypeName);
    try{
         const roomType = await RoomType.findOneAndDelete({name: roomTypeName})
         res.send(`${roomType} was deleted.`)
         console.log(`${roomType} was deleted.`);
    } catch (err) {
        console.log(err);
    }
 })

 module.exports = router;