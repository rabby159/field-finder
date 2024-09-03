import express from 'express'
import validatedRequestZod from '../../middlewares/validatedRequestZod'
import { userValidation } from './user.validation'
import { UserControllers } from './user.controller'

const router = express.Router()

router.post(
  '/create-user',
  validatedRequestZod(userValidation.createUserValidationSchema),
  UserControllers.createUser,
)

export const UserRoutes = router
