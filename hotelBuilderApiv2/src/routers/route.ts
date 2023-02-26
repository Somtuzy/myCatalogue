import  { Router } from 'express'
import userRouter from './user.route'
import roomTypeRouter from './roomtype.route'
import roomRouter from './room.route'

const router = Router()

router.use('/v1', userRouter)
router.use('/v1/rooms', roomRouter)
router.use('/v1/roomtypes', roomTypeRouter)

export default router;