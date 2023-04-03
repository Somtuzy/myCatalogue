const router = require('express').Router()
const { login } = require('../controllers/user.login')
const signup = require('../controllers/user.signup')
const { editUser, deleteUser, getUser, getUsers } = require('../controllers/user.controller')
const authenticate = require('../middlewares/authenticate')
const authorise = require('../middlewares/authorise')
const { validateUserInputs } = require('../middlewares/validate')


router.route('/users/:id')
.patch(authenticate, authorise, editUser)
.delete(authenticate, authorise, deleteUser)
.get(authenticate, getUser)

router.get('/users', authenticate, authorise, getUsers)

router.route('/signup')
.post(validateUserInputs, signup)

router.route('/login')
.post(login)

module.exports = router;