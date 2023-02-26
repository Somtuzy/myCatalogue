import { Request, Response, NextFunction } from 'express'
import { userService } from '../controllers/user.login'
import { AuthRequest } from '../interfaces/index.int';
import { iUser } from '../interfaces/service.int';

const authorize = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as AuthRequest).user;
        const authUser = await userService.getOne({ _id: (user as iUser).id })

        if (!user) {
            return res.status(403).send({
                message: 'You must be signed in to view this page',
                status: 'failed'
            })
        } else {
            if (user.role === 'admin') {
                console.log('Admin access granted to:', user);

                next()
            } else {
                return res.status(403).send({
                    message: 'You are not authorised to view this page',
                    status: 'failed'
                })
            }
        }
    } catch (err) {
        return res.status(404).send({
            message: err,
            status: 'failed'
        })
    }
}

export default authorize;