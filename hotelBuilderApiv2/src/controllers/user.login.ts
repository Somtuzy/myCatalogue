import {Request, Response, NextFunction } from 'express'
import userModel from '../models/user.model'
import Services from '../services/service'
import { verifyPassword } from '../services/bcrypt.service'
import { generateToken } from '../services/jwt.service'

const userService = new Services(userModel)

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body
    let user;

    // Checks for what a user is logging in with
    if (email && password) user = await userService.getOne({email})
    if (username && password) user = await userService.getOne({username})

    // Sends a message if the user doesn"t exist
    if(!user || user === null){
            return res.status(404).send({
                message: `User does not exist, would you like to sign up?`
            })
        }

    // Checks if the password input by the client matches the protected password of the returned user
    const isValid = verifyPassword(password, user.password)

    // Sends a message if the input password doesn't match
    if(!isValid){
        return res.status(400).send({
            message: 'Incorrect password, please retype your password',
            status: 'failed'
        })
    }

    // Stores the returned user's unique id and role in an object to generate an authentication token for them 
    const useForToken = {
        id: user._id,
        username: user.username
    }

    // Generates a token for the user 
    const token = generateToken(useForToken)

    // This saves the token as a cookie for the duration of its validity just to simulate how the request header works for the purpose of testing.
    res.cookie('token', token, {httpOnly: true})

    // Removes password from output
    if (user && user.password) {
        user.password = null;
    }

    // Sends success message on the console
    console.log(`Token successfully generated for ${user}`);

    // Sends the token to the client side for it to be set as the request header using axios
    res.json({token, user})

    next()
}

export { userService, login } 