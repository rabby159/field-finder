import config from '../../config'
import { generateUserId } from './users.utils'
import { QuarterYear } from '../quarterYear/quarterYear.model'
import { Users } from './users.model'
import AppError from '../../error/appError'
import httpStatus from 'http-status'
import { TUsers } from './users.interface'
import mongoose from 'mongoose'
import { TUser } from '../user/user.interface'
import { User } from '../user/user.model'

const createUserIntoDB = async (password: string, payload: TUser) => {
  // create a user object
  const usersData: Partial<TUsers> = {}

  //if password is not given , use default password
  usersData.password = password || (config.default_pass as string)

  //set student role
  usersData.role = 'user'

  // find academic semester info
  const quarterYearFind = await QuarterYear.findById(payload.quarterYear)

  // Check if the semester is not null before using it
  if (!quarterYearFind) {
    throw new Error('Quarter not found')
  }

  //start session
  const session = await mongoose.startSession()

  // try {
  //   //start transaction
  //   session.startTransaction()

  //   //set  generated id
  //   usersData.id = await generateUserId(quarterYearFind)

  //   // create a user (transaction-1)
  //   const newUsers = await Users.create([usersData], { session })

  //   //create a student
  //   if (!newUsers.length) {
  //     throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create users')
  //   }

  //   // set id , _id as user
  //   payload.id = newUsers[0].id
  //   payload.users = newUsers[0]._id //reference _id

  //   // create a user (transaction-2)
  //   const newSingleUser = await User.create([payload], { session })

  //   if (!newSingleUser.length) {
  //     throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
  //   }

  //   await session.commitTransaction()
  //   await session.endSession()

  //   return newSingleUser

  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // } catch (err: any) {
  //   await session.abortTransaction()
  //   await session.endSession()
  //   throw new Error(err)
  //   //throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user test 123')
  // }
  try {
    session.startTransaction()

    let newUsers
    let retries = 0
    const maxRetries = 3

    while (retries < maxRetries) {
      try {
        // Set generated ID for the user
        usersData.id = await generateUserId(quarterYearFind)

        console.log(`Generated user ID: ${usersData.id}`) // Debugging log

        // Attempt to create the user
        newUsers = await Users.create([usersData], { session })

        if (!newUsers.length) {
          throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create users')
        }

        break // Exit loop if creation succeeds
      } catch (error) {
        if (error.code === 11000 && error.keyPattern?.id) {
          retries += 1
          console.warn(`Duplicate user ID detected, retrying... (${retries}/${maxRetries})`) // Log retries
          if (retries >= maxRetries) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Max retries reached, failed to create user')
          }
        } else {
          // If other errors occur, throw them
          console.error(`Error creating user: ${error.message}`) // Detailed error log
          throw error
        }
      }
    }

    // Create user record
    payload.id = newUsers[0].id
    payload.users = newUsers[0]._id

    const newUser = await User.create([payload], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    await session.commitTransaction()
    session.endSession()

    return newUser
  } catch (err) {
    await session.abortTransaction()
    session.endSession()
    console.error(`Transaction aborted: ${err.message}`) // Transaction failure log
    throw new AppError(httpStatus.BAD_REQUEST, `Failed to create user test: ${err.message}`)
  }
}

export const UsersServices = {
  createUserIntoDB,
}
