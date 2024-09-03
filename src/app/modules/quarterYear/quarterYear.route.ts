import express from 'express'
import validatedRequestZod from '../../middlewares/validatedRequestZod'
import { QuarterYearValidation } from './quarterYear.validation'
import { QuarterYearControllers } from './quarterYear.controller'

const router = express.Router()

router.post(
  '/create-quarter',
  validatedRequestZod(QuarterYearValidation.createQuarterValidationSchema),
  QuarterYearControllers.createQuarterYear,
)

export const QuarterYearRoutes = router
