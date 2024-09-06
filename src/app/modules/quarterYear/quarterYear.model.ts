import httpStatus from 'http-status'
import { TQuarter } from './quarterYear.interface'
import { model, Schema } from 'mongoose'
import { Months, QuarterCode, QuarterName } from './quarterYear.constant'
import AppError from '../../error/appError'

const QuarterYearSchema = new Schema<TQuarter>(
  {
    name: {
      type: String,
      required: true,
      enum: QuarterName,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: QuarterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
)

QuarterYearSchema.pre('save', async function (next) {
  const isQuarterExists = await QuarterYear.findOne({
    year: this.year,
    name: this.name,
  })

  if (!isQuarterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This quarter is already exists. Thank you',
    )
  }
  next()
})

export const QuarterYear = model<TQuarter>(
  'QuarterYear',
  QuarterYearSchema,
)
