const jwt = require('jsonwebtoken')

// Accesses the secret key used for token generation and the duration of the token
require('dotenv').config()
const secretKey = process.env.JWT_SECRET_KEY
const duration = process.env.JWT_EXPIRES_IN

// Generates a token that authenticates a user whenever they sign in. Without this token, a user isn't recognised as authentic
const generateToken = (payload) => {
    const token = jwt.sign(payload, secretKey, {expiresIn: duration})
    return token
}

// Verifies the authenticity of a user by checking the validity of the user's token when they make a request
const verifyToken = (payload) => {
    const validToken = jwt.verify(payload, secretKey)
    return validToken
}

module.exports = { generateToken, verifyToken }