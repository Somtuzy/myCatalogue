import { Request, Response } from 'express'
import Services from '../services/service'
import userModel from '../models/user.model'
import { AuthRequest } from '../interfaces/index.int'

const userService = new Services(userModel)

class UserController {

    // Updating a user
    async editUser(req: Request, res: Response) {
        try {
                const id = req.params.id

                const { fullname, username, email, password, role, age } = req.body

                // Checks if user already exists
                const existingUser = await userService.getOne({_id: id})

                // Sends a message if the specified user does not exist
                if(!existingUser) {
                    return res.status(404).send({
                        success: false,
                        message: 'This user does not exist'
                    })
                }

                // Updates the user
                const updatedUser = await userService.edit(id, {username: username, fullname: fullname, email: email, password: password, role: role, age: age})

                // Sends a success message and displays the updated user
                return res.status(200).send({
                        success: true,
                        message: 'User updated successfully!',
                        data: updatedUser
                })
                
        } catch (err: any) {
            return res.send({
                error: err,
                message: err.message
            })
        }     
    }

    // Deleting a user
    async deleteUser(req: Request, res: Response) {
        try {
                const id = req.params.id
            
                const existingUser = await userService.getOne({_id: id})

                // Sends a message if the specified user does not exist
                if(!existingUser) {
                    return res.status(404).send({
                        success: false,
                        message: 'This user does not exist'
                    })
                } 
                
                // Deletes the user
                const deletedUser = await userService.delete(id)
            
                // Sends a success message and displays the deleted user
                return res.status(200).send({
                    success: true,
                    message: 'User deleted successfully!',
                    data: deletedUser
                })
        } catch (err: any) {
            return res.send({
                error: err,
                message: err.message
            })
        }  
    }

    // Getting one user by id
    async getUser(req: Request, res: Response) {
        try {
                const id = req.params.id

                const existingUser = await userService.getOne({_id: id})

                // Sends a message if the specified user does not exist
                if(!existingUser) {
                    return res.status(404).send({
                        success: false,
                        message: 'This user does not exist'
                    })
                } 
                
                // Sends a success message and displays user
                return res.status(200).send({
                    success: true,
                    message: 'User fetched successfully!',
                    data: existingUser
                })
        } catch (err: any) {
            return res.send({
                error: err,
                message: err.message
            })
        }  
    }

    // Getting all users
    async getUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAll({})

            // Sends a message if no users exist
            if(!users) {
                return res.status(404).send({
                    success: false,
                    message: 'There are no users on your database'
                })
            } else {
                // Sends a success message and displays users
                return res.status(200).send({
                    success: true,
                    message: 'Users fetched successfully!',
                    data: users
                })
            }
        } catch (err: any) {
            return res.send({
                error: err,
                message: err.message
            })
        } 
    }
}

export default new UserController()