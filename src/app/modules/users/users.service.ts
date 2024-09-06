import config from '../../config'
import { TUser } from './users.interface'
import { generateUserId } from './users.utils'
import { QuarterYear } from '../quarterYear/quarterYear.model'
import { User } from './users.model'
import AppError from '../../error/appError'
import httpStatus from 'http-status'

const createUserIntoDB = async (password: string, payload: TUser) => {
  // create a user object
  // const userData: Partial<TUser> = {}

  //if password is not given , use default password
  payload.password = password || (config.default_pass as string)

  //set student role
  payload.role = 'user'

  // find academic semester info
  const quarterYear = await QuarterYear.findById(payload.quarterYear)

  // Check if the semester is not null before using it
  if (!quarterYear) {
    throw new Error('Quarter not found')
  }
  //set  generated id
  payload.id = await generateUserId(quarterYear)

  // create a user (transaction-1)
  const newUser = await User.create([payload])

  //create a student
  if (!newUser.length) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
  }
  // set id , _id as user
  // payload.id = newUser[0].id

  return newUser
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
}

export const UserServices = {
  createUserIntoDB,
}
