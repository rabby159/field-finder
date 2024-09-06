import express from 'express'
import validatedRequestZod from '../../middlewares/validatedRequestZod'
import { userValidation } from './users.validation'
import { UserControllers } from './users.controller'

const router = express.Router()

router.post(
  '/create-user',
  validatedRequestZod(userValidation.usersValidationSchema),
  UserControllers.createUser,
)

export const UserRoutes = router
