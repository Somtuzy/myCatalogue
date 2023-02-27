import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../services/jwt.service'
import userModel from '../models/user.model'
import { iUser } from '../interfaces/service.int'
import { AuthRequest } from '../interfaces/index.int'

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = ''
        //Gets token from client header (like a cookie stored or attached to a user's unique id from the client side after they sign up or sign in)
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else {
            // This is an alternate method of getting it from previously set cookies for the purpose of testing
            token = req.cookies.token
        }

        // Checks if a token exists and returns a message if none was found
        if (!token) return res.status(400).send({
            message: 'You must be signed in to view content'
        })

        // Decode the user token referenced in the request header?cookie to verify its authenticity by checking the token against the secret key. If the token is valid, we should get the user credentials associated with that token.
        const decodedReqToken = verifyToken(token);

        // If secret key doesn't recognise the token, the user isn't authenticated and asked to try signing in again to get a new token
        if (!decodedReqToken) {
            return res.status(403).send({
                message: 'User authentication failed, please try signing in again',
                status: 'failed'
            })
        }

        // The secretkey recognises the token and gives the payload associated with it for the database to be checked to see if a user exists with the id from the payload. A payload is a user's unique sign in credentials.
        const validUser: iUser | null = await userModel.findById(decodedReqToken.id)

        // If no user is found with the payload (credentials), authentication fails.
        if (!validUser) {
            return res.status(400).send({
                message: 'User Authentication Failed',
                status: 'failed'
            });
        }

        // If the user exists on the database, they're authentic users and are granted access to protected content
        console.log(validUser.username + " is successfully authenticated");

        // The user is then added to the request so all their requests will be associated with their credentials.
        (req as AuthRequest).user = validUser;
        next();
    } catch (err) {
        return res.status(400).send({
            message: err,
            status: 'failed'
        })
    }
}

export default authenticate;