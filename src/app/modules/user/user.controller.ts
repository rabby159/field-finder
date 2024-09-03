import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const createUser = catchAsync(async (req, res) => {
  const { password, user: userData } = req.body

  //will we call services function to send this data
  const result = await UserServices.createStudentIntoDB(password, userData)

  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  })
})
