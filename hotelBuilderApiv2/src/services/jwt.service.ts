import jwt from 'jsonwebtoken'

// Accesses the secret key used for token generation and the duration of the token
import dotenv from 'dotenv'
dotenv.config()

// Getting the secret key and duration of token from the .env
const secretKey: string | undefined = process.env.JWT_SECRET_KEY
const duration: string | undefined = process.env.JWT_EXPIRES_IN

// Generates a token that authenticates a user whenever they sign in. Without this token, a user isn't recognised as authentic
const generateToken = (payload: any): string => {
    const token = jwt.sign(payload, secretKey as string, {expiresIn: duration as string})
    return token
}

// Verifies the authenticity of a user by checking the validity of the user's token when they make a request
const verifyToken = (payload: string): any => {
    const validToken = jwt.verify(payload, secretKey as string)
    return validToken
}

export { generateToken, verifyToken }