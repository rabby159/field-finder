import { z } from 'zod'
import { Months, QuarterCode, QuarterName } from './quarterYear.constant'

const createQuarterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...QuarterName] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...QuarterCode] as [string, ...string[]]),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
})

export const QuarterYearValidation = {
  createQuarterValidationSchema,
}
