import express from 'express'
import validatedRequestZod from '../../middlewares/validatedRequestZod'
import { userValidation } from './user.validation'

const router = express.Router()

router.post(
  '/create-user',
  validatedRequestZod(userValidation.createUserValidationSchema),
)

export const UserRoutes = router
