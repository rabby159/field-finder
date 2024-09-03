import { quarterYearNameCodeMapper } from './quarterYear.constant'
import { TQuarter } from './quarterYear.interface'
import { QuarterYear } from './quarterYear.model'

const createQuarterYearIntoDB = async (payload: TQuarter) => {
  if (quarterYearNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid quarter code. Please Enter right code')
  }

  const result = await QuarterYear.create(payload)

  return result
}

export const QuarterYearServices = {
  createQuarterYearIntoDB,
}
