import express from 'express'
import validatedRequestZod from '../../middlewares/validatedRequestZod'
import { usersValidation } from './users.validation'
import { UsersControllers } from './users.controller'

const router = express.Router()

router.post(
  '/create-user',
  validatedRequestZod(usersValidation.usersValidationSchema),
  UsersControllers.createUser,
)

export const UsersRoutes = router
