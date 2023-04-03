import { Router } from 'express'
import authenticate from '../middlewares/authenticate'
import authorize from '../middlewares/authorize'
import { validateRoomInputs } from '../middlewares/validate'
import room from '../controllers/room.controller'

const router = Router()

router.route('/:id')
.patch(authenticate, authorize, room.editRoom)
.delete(authenticate, authorize, room.deleteRoom)
.get(authenticate, room.getRoom)

router.get('/', authenticate, room.getRooms)

router.route('/create')
.post(authenticate, authorize, validateRoomInputs, room.addRoom)

export default router;