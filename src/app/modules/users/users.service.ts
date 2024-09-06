import config from '../../config'
import { generateUserId } from './users.utils'
import { QuarterYear } from '../quarterYear/quarterYear.model'
import { Users } from './users.model'
import AppError from '../../error/appError'
import httpStatus from 'http-status'
import { TUsers } from './users.interface'
import mongoose from 'mongoose'
import { TUser } from '../user/user.interface'

const createUserIntoDB = async (password: string, payload: TUser) => {
  // create a user object
  const usersData: Partial<TUsers> = {}

  //if password is not given , use default password
  usersData.password = password || (config.default_pass as string)

  //set student role
  usersData.role = 'user'

  // find academic semester info
  const quarterYear = await QuarterYear.findById(payload.quarterYear)

  // Check if the semester is not null before using it
  if (!quarterYear) {
    throw new Error('Quarter not found')
  }

  //start session
  const session = await mongoose.startSession()

  try{
    //start transaction
    session.startTransaction()

    //set  generated id
    payload.id = await generateUserId(quarterYear)

    // create a user (transaction-1)
  const newUsers = await Users.create([payload])

  //create a student
  if (!newUsers.length) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
  }

  // set id , _id as user
  payload.id = newUsers[0].id
  payload.users = newUsers[0]._id //reference _id

  // create a user (transaction-2)
  const newUser = await User.create([payload], { session })

  if (!newUser.length) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
  }

  await session.commitTransaction()
  await session.endSession()

  return newUser
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch(err){
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
  }
}

export const UserServices = {
  createUserIntoDB,
}
