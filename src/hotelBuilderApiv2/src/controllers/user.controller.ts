import { Request, Response } from 'express'
import Services from '../services/service'
import userModel from '../models/user.model'
import { AuthRequest, Data, Message } from '../interfaces/index.int'
import { hashPassword, verifyPassword } from '../services/bcrypt.service'
import { iUser } from '../interfaces/service.int'

const userService = new Services(userModel)

class UserController {

    // Updating a user
    async editUser(req: Request, res: Response) {
        try {
            const { fullname, username, email, password, newPassword, age } = req.body;
            const id = req.params.id;
            const user = (req as AuthRequest).user;
            const reqUserId = (user as iUser).id;

            // Checks if user already exists
            const existingUser = await userService.getOne({ _id: id });

            // Sends a message if the specified user does not exist
            if (!existingUser) {
                return res.status(404).json({
                    message: `This user does not exist`,
                    success: false
                });
            }

            if (reqUserId !== existingUser._id.toString())
                return res.status(403).json({
                    message: `You cannot update this user`,
                    success: false
                });

            // Updates the user based on what was provided
            const data: Data = {}
            if (fullname) data.fullname = fullname
            if (username) data.username = username
            if (email) data.email = email
            if (age) data.age = age

            if (!password && newPassword) return res.status(401).json({
                message: `Please input your current password`,
                success: false
            })

            if (password && !newPassword) return res.status(401).json({
                message: `Please input your new password`,
                success: false
            })

            if (password && newPassword) {
                const isValid = await verifyPassword(password, existingUser.password)

                if (!isValid) return res.status(400).json({
                    message: `Password is incorrect`,
                    success: false
                })

                const updatedPassword = await hashPassword(newPassword)
                data.password = updatedPassword ? updatedPassword : null
            }

            let updatedUser;
            updatedUser = await userService.edit(id, data);
            updatedUser = await userService.getOne({ _id: updatedUser._id });

            const message: Message = {}

            // Sends a success message and displays the updated user
            if (data.fullname) message.fullname = `Updated successfully!`;

            if (data.username) message.username = `Updated successfully!`;

            if (data.email) message.email = `Updated successfully!`;

            if (data.age) message.age = `Updated successfully!`;

            if (data.password) message.password = `Changed successfully!`;

            return res.status(200).json({
                message: message,
                success: true
            });
        } catch (err: any) {
            return res.status(500).json({
                message: err.message,
                success: false
            });
        }
    }

    // Deleting a user
    async deleteUser(req: Request, res: Response) {
        try {
            const id = req.params.id
            const user = (req as AuthRequest).user;
            const reqUserId = (user as iUser).id;

            const existingUser = await userService.getOne({ _id: id })

            // Sends a message if the specified user does not exist
            if (!existingUser) {
                return res.status(404).send({
                    success: false,
                    message: 'This user does not exist'
                })
            }

            if (reqUserId !== existingUser._id.toString())
                return res.status(403).json({
                    message: `You cannot update this user`,
                    success: false
                });

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

            const existingUser = await userService.getOne({ _id: id })

            // Sends a message if the specified user does not exist
            if (!existingUser) {
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
            if (!users) {
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