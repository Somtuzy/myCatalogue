const userSchema = require('../models/user.model')
const Services = require('../services/service')
const userService = new Services(userSchema)
const { hashPassword } = require('../services/bcrypt.service')
const { generateToken } = require('../services/jwt.service')
require('dotenv').config()
const rounds = parseFloat(process.env.ROUNDS)


// Registers a user and gives them a token
const signup = async (req, res, next) => {
    const { fullname, username, email, password, role, age } = req.body
    
    // Checks for existing user
    const existingUser = await userService.getOne({username: username, email: email})
    if(existingUser) {
        // Gives forbidden message
        return res.status(403).send({
                message: 'User already exists',
                status: 'failed'
        })
    }

    // Hashes the user password for extra protection
    const safePassword = await hashPassword(password, rounds)
    const user = await userService.create({fullname, username, email, password: safePassword, role, age})

    // Stores the returned user's unique id and role in an object to generate an authentication token for them 
    const useForToken = {
        id: user._id,
        role: user.role
    }

    // Generates a token for the user 
    const token = generateToken(useForToken)

    // Saves the user
    await user.save()

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

module.exports =  signup;