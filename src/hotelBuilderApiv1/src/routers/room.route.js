const router = require('express').Router()
const authenticate = require('../middlewares/authenticate')
const access = require('../middlewares/authorise')
const { validateRoomInputs } = require('../middlewares/validate')
const { addRoom, editRoom, deleteRoom, getRoom, getRooms } = require('../controllers/room.controller')


router.route('/:id')
.patch(authenticate, access, editRoom)
.delete(authenticate, access, deleteRoom)
.get(authenticate, getRoom)

router.get('/', authenticate, getRooms)

router.route('/create')
.post(authenticate, access, validateRoomInputs, addRoom)

module.exports = router;