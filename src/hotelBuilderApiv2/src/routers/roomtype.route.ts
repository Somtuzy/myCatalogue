import { Router } from 'express'
import authenticate from '../middlewares/authenticate'
import authorize from '../middlewares/authorize'
import { validateRoomTypeInputs } from '../middlewares/validate'
import roomtype from '../controllers/roomtype.controller'

const router = Router()

router.route('/:id')
.patch(authenticate, authorize, roomtype.editRoomType)
.delete(authenticate, authorize, roomtype.deleteRoomType)
.get(authenticate, roomtype.getRoomType)

router.get('/', authenticate, roomtype.getRoomTypes)

router.route('/create')
.post(authenticate, authorize, validateRoomTypeInputs, roomtype.addRoomType)

export default router;