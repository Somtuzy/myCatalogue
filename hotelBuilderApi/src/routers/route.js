const router = require('express').Router()
const userRouter = require('./user.route')
const roomTypeRouter = require('./roomtype.route')
const roomRouter = require('./room.route')


router.use('/v1', userRouter)
router.use('/v1/rooms', roomRouter)
router.use('/v1/roomtypes', roomTypeRouter)

module.exports = router;