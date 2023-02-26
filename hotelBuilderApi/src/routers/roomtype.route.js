const router = require('express').Router()
const authenticate = require('../middlewares/authenticate')
const authorise = require('../middlewares/authorise')
const { validateRoomTypeInputs } = require('../middlewares/validate')
const { addRoomType, editRoomType, deleteRoomType, getRoomType, getRoomTypes } = require('../controllers/roomtype.controller')


router.route('/:id')
.patch(authenticate, authorise, editRoomType)
.delete(authenticate, authorise, deleteRoomType)
.get(authenticate, getRoomType)

router.get('/', authenticate, getRoomTypes)

router.route('/create')
.post(authenticate, authorise, validateRoomTypeInputs, addRoomType)

module.exports = router;