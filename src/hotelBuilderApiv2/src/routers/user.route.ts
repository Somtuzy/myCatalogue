import express, { Router } from 'express'
import { login } from '../controllers/user.login'
import signup from '../controllers/user.signup'
import  user  from '../controllers/user.controller'
import authenticate from '../middlewares/authenticate'
import authorize from '../middlewares/authorize'
import { validateUserInputs } from '../middlewares/validate'

const router = Router()

router.route('/users/:id')
.patch(authenticate, user.editUser)
.delete(authenticate, user.deleteUser)
.get(authenticate, user.getUser)

router.get('/users', authenticate, authorize, user.getUsers)

router.route('/signup')
.post(validateUserInputs, signup)

router.route('/login')
.post(login)

export default router;