import { Request, Response } from 'express'
import { iRoomType } from '../interfaces/service.int'
import Services from '../services/service'
import roomTypeModel from '../models/roomtype.model'
const roomTypeService = new Services<iRoomType>(roomTypeModel)


class RoomTypeController {
    async addRoomType(req: Request, res: Response) {
        try {
            const { name, description } = req.body

            // Check if roomtype exists
            const existingRoomType = await roomTypeService.getOne({name: name})
            if(existingRoomType){
                // Send a forbidden message if roomtype already exists
                return res.status(403).send({
                    success: false,
                    message: 'Roomtype already exists!'
                })
            } 
            
            // Creates roomtype and sends a success message
            const newRoomType = await roomTypeService.create({name: name, description: description})
            await newRoomType.save()
            return res.status(201).send({
                success: true,
                message: 'Roomtype created successfully!',
                data: newRoomType
            })
        } catch (err: any) {
            return res.send({
                error: err,
                message: err.message
            })
        }  
    }


    async editRoomType(req: Request, res: Response) {
        try {
            const roomTypeName = req.params.name
            const { name, description } = req.body

            // Creates a regex pattern to allow a user to search for a roomtype in a case sensitive manner and with a hyphen between every word for compound roomtype names 
            let input = roomTypeName.replace(/[- ]/g, "[- ]?");
            let result = new RegExp("^" + input + "$")
            let regexName = {$regex: result, $options: 'i'}

            const existingRoomType = await roomTypeService.getOne({name: regexName})

            // Sends a message if the specified roomtype does not exist
            if(!existingRoomType) {
                return res.status(404).send({
                    success: false,
                    message: 'This roomtype does not exist'
                })
            }

            // Updates the roomtype
            const updatedRoomType = await roomTypeService.edit(existingRoomType, {name: name, description: description})

            // Sends a success message and displays the updated roomtype
            return res.status(200).send({
                success: true,
                message: 'Roomtypes updated successfully!',
                data: updatedRoomType
            })
        } catch (err: any) {
            return res.send({
                error: err,
                message: err.message
            })
        } 
    }

    // Deleting a roomtype
    async deleteRoomType(req: Request, res: Response) {
        try {
            const roomTypeName  = req.params.name

            // Creates a regex pattern to allow a user to search for a roomtype in a case sensitive manner and with a hyphen between every word for compound roomtype names 
            let input = roomTypeName.replace(/[- ]/g, "[- ]?");
            let result = new RegExp("^" + input + "$")
            let regexName = {$regex: result, $options: 'i'}

            const existingRoomType = await roomTypeService.getOne({name: regexName})

            // Sends a message if the specified roomtype does not exist
            if(!existingRoomType) {
                return res.status(404).send({
                    success: false,
                    message: 'This roomtype does not exist'
                })
            } 

            // Deletes the roomtype
            const deletedRoomType = await roomTypeService.delete(existingRoomType)
            
            // Sends a success message and displays the deleted roomtype
            return res.status(200).send({
                success: true,
                message: 'Roomtype deleted successfully!',
                data: deletedRoomType
            })
        } catch (err: any) {
            return res.send({
                error: err,
                message: err.message
            })
        }    
    }


    // Getting one roomtype
    async getRoomType(req: Request, res: Response) {
        try {
            const roomTypeName  = req.params.name

            // Creates a regex pattern to allow a user to search for a roomtype in a case sensitive manner and with a hyphen between every word for compound roomtype names 
            let input = roomTypeName.replace(/[- ]/g, "[- ]?");
            let result = new RegExp("^" + input + "$")
            let regexName = {$regex: result, $options: 'i'}

            const existingRoomType = await roomTypeService.getOne({name: regexName})

            // Sends a message if the specified roomtype does not exist
            if(!existingRoomType) {
                return res.status(404).send({
                    success: false,
                    message: 'This roomtype does not exist'
                })
            } 

            // Sends a success message and displays roomtype
            return res.status(200).send({
                success: true,
                message: 'Roomtype fetched successfully!',
                data: existingRoomType
            })
        } catch (err: any) {
            return res.send({
                error: err,
                message: err.message
            })
        }   
    }


    // Getting all roomtypes
    async getRoomTypes(req: Request, res: Response) {
        try {
            const roomTypes = await roomTypeService.getAll({})

            // Sends a message if no roomtypes exists
            if(!roomTypes) {
                return res.status(404).send({
                    success: false,
                    message: 'There are no roomtypes on your database'
                })
            } 

            // Sends a success message and displays roomtypes
            return res.status(200).send({
                success: true,
                message: 'Roomtypes fetched successfully!',
                data: roomTypes
            })
        } catch (err: any) {
            res.send({
                error: err,
                message: err.message
            })
        }   
    }
}

export default new RoomTypeController()