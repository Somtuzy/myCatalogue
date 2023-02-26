const Services = require('../services/service')
const RefServices = require('../services/find.populate')
const roomModel = require('../models/room.model')
const roomTypeModel = require('../models/roomtype.model')
const roomService = new Services(roomModel)
const refRoomFinderService = new RefServices(roomModel)
const roomTypeService = new Services(roomTypeModel)



class RoomController {
    // Adding a room
    async addRoom(req, res) {
        try {
            const { codename, roomtype, price, description } = req.body

            // Checks if room already exists
            const existingRoom = await roomService.getOne({codename})

            // Sends a forbidden message if room already exists
            if(existingRoom) {
                return res.status(403).send({
                    success: false,
                    message: 'Room already exists',
                })
            }
            
            // Searches for an existing roomtype with the name provided and creates a room with it
            const searchForRoomType = await roomTypeService.getOne({name: roomtype})
            if(searchForRoomType){
                const newRoomType = await roomTypeModel.findOneAndUpdate({name: roomtype}, {name: roomtype, description}, {upsert: true, new: true})
                const newRoom = await roomService.create({codename, roomtype: newRoomType._id, price})
                await newRoom.save()
                
                return res.status(201).send({
                    success: true,
                    message: 'Room created succesfully!',
                    data: newRoom
                })
            } else {
                // Sets the roomtype name and description in an object with the details provided and creates a new roomtype
                let roomtypedetails = {}
                roomtypedetails.name = roomtype
                roomtypedetails.description = description
                const roomType = await roomTypeService.create(roomtypedetails)

                // Creates room with the new roomtype
                const newRoom = await roomService.create({codename, price, roomtype: roomType._id})
                await newRoom.save()

                return res.status(201).send({
                    success: true,
                    message: 'Room created succesfully!',
                    data: newRoom
                })
            }
        } catch (err) {
            return res.send({
                error: err,
                message: err.message
            })
        }   
    }

    // Updating a room by its id
    async editRoom(req, res) {
        try {
            const roomId = req.params.id
            const { codename , price} = req.body

            // Checks if room exists
            const existingRoom = await refRoomFinderService.getOne({_id: roomId})

            // Sends a forbidden message if room doesn't exist
            if(!existingRoom) {
                return res.status(403).send({
                success: false,
                message: 'Room does not exist',
                })
            }

            // Checks that there's no other room with the new codename 
            if(codename){
                const existingRoomCodeName = await roomService.getOne({codename})
                if(existingRoomCodeName === null) {
                    // Updates the room if there's no room with the new room name 
                    const updatedRoom = await roomService.update(roomId, {codename, price})

                    // Sends a success message
                    return res.status(200).send({
                        success: true,
                        message: 'Room updated succesfully!',
                        data: updatedRoom
                    })
                }  else {
                    // Sends a forbidden message if both ids aren't the same as it means that a room with the new codename already exists
                    return res.status(403).send({
                        success: false,
                        message: 'Room name already exists!',
                    })
                }
            }
        } catch (err) {
            return res.send({
                error: err,
                message: err.message
            })
        }  
    }


    // Deleting a room by its id
    async deleteRoom(req, res) {
        try {
            const roomId = req.params.id

            // Checks if room exists
            const existingRoom = await refRoomFinderService.getOne({_id: roomId})

            // Sends a forbidden message if room doesn't exist
            if(!existingRoom) {
            return res.status(403).send({
                    success: false,
                    message: 'Room does not exist',
                })
            } else {
                const deletedRoom = await roomService.delete(roomId)

                // Sends a success message after deleting the room
                res.status(403).send({
                    success: true,
                    message: 'Room deleted successfully!',
                    data: deletedRoom
                })
            }
        } catch (err) {
            return res.send({
                error: err,
                message: err.message
            })
        }  
    }

    // Get a single room by its
    async getRoom(req, res) {
        try {
            const roomId = req.params.id

            const foundRoom = await refRoomFinderService.getOne({_id: roomId})

            if(!foundRoom){
                return res.status(400).send({
                    success: false,
                    message: 'Room does not exist!'
                })
            } else {
                // Send a success message with the room
                res.status(200).send({
                    success: true,
                    message: 'Room fetched successfully!!',
                    data: foundRoom
                })
            }
        } catch (err) {
            return res.send({
                error: err,
                message: err.message
            })
        }   
    }

    // Get rooms by filter
    async getRooms(req, res) {
        try {
            // Taking the queries and storing in a variable
            const codeName = req.query.search
            const roomTypeName = req.query.roomType
            const minPrice = req.query.minPrice
            const maxPrice = req.query.maxPrice

            // To display all rooms without filter
            let foundRooms = await refRoomFinderService.getAll({name: 'room'}, "roomtype")

            // If there's no query, return a message with all rooms
            if (!codeName && !roomTypeName && !maxPrice && !minPrice && foundRooms) return res.status(200).send({
                    message: 'Here are all rooms below:',
                    data: foundRooms
                })  
            
            // Creates an object to store the query values and sets a status for validating a query input
            let filter = {}, status = false; 

                // Checks which keys were used to query and sets their values as part of the query filter data 
                if (codeName) {
                    console.log;
                    const checkRooms = await roomService.getOne({codename: codeName})

                    // Checks if a room exists with the input, if true, adds the room name to the filter object and sets status to true
                    if(checkRooms) {
                        let code = codeName.replace(/[- ]/g, "[- ]?");
                        code = new RegExp(code)
                        filter.codename = {$regex: code, $options: 'i'}
                        status = true;
                    }  
                }

                if (roomTypeName) {
                    let type = roomTypeName.replace(/[- ]/g, "[- ]?");
                    type = new RegExp("^" + type + "$")
                    const roomType = await roomTypeService.getOne({name: {$regex: type, $options: 'i'}})

                    // Checks if a roomtype exists with the input, if true, adds the roomtype id to the filter object and sets status to true
                    if(roomType) {
                        filter.roomtype = roomType._id
                        status = true;
                    }
                }

                if (minPrice && maxPrice) {
                    // Adds the price range to the filter object and sets status to true
                    filter.price = {$gte: minPrice, $lte: maxPrice}
                    status = true;
                }

                else if (minPrice) {
                    // Adds the minimum price to the filter object and sets status to true
                    filter.price = {$gte: minPrice}
                    status = true;
                }

                else if (maxPrice) {
                    // Adds the maximum price to the filter object and sets status to true
                    filter.price = {$gte: maxPrice}
                    status = true;
                }

               if (status && filter) {
                    // Uses the entire filter data gathered from the query to look for rooms on the database that match the criteria provided the status is true.
                    foundRooms = await refRoomFinderService.getAll(filter, "roomtype")

                    // Sends a message if there are rooms on the database and the query input(s) exist(s)
                    return res.status(200).send({
                        message: 'Here are rooms matching your search criteria',
                        data: foundRooms
                    })
                }
                
                // If there are rooms on the database but the user queried with an input that doesn't match
                if(foundRooms && !status) return res.status(404).send({
                    message: 'There are no rooms matching your search criteria'
                })

        } catch (err) {
            return res.send({
                message: err.message
            })
        }  
    }
}

module.exports = new RoomController()