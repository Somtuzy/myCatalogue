const userService = require('../services/user.service')
const { verifyPassword } = require('../services/bcrypt.service')
const { generateToken } = require('../services/jwt.service')
const { log } = require('console')

const login = async (req, res, next) => {
    const { username, email, password } = req.body
    let user;

    // Checks for what a user is logging in with
    if(!email && !username) return res.status(404).send({
        message: `Please input your username or email to continue`
    }) 

    if(!password) return res.status(404).send({
        message: `Please input your password to continue`
    }) 

    if (email && password) user = await userService.getOne({email})
    if (username && password) user = await userService.getOne({username})

    // Sends a message if the user doesn"t exist
    if(!user || user === null){
            return res.status(404).send({
                message: `User does not exist, would you like to sign up?`
            })
        }

    // Checks if the password input by the client matches the protected password of the returned user
    const isValid = await verifyPassword(password, user.password)
    console.log(isValid);
    console.log(user.password);

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
        role: user.role
    }

    // Generates a token for the user 
    const token = generateToken(useForToken)

    // This saves the token as a cookie for the duration of its validity just to simulate how the request header works for the purpose of testing.
    res.cookie('token', token, {httpOnly: true})

    user = await userService.find({_id: user._id})

    // Sends success message on the console
    console.log(`Token successfully generated for ${user}`);

    // Sends the token to the client side for it to be set as the request header using axios
    return res.json({token, user})
}

module.exports = { userService, login }