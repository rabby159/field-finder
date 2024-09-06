import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { UserServices } from './users.service'

const createUser = catchAsync(async (req, res) => {
  const { password, user: userData } = req.body

  //will we call services function to send this data
  const result = await UserServices.createUserIntoDB(password, userData)

  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  })
})

export const UserControllers = {
  createUser,
}
