

const createUser = catchAsync(async (req, res) => {
    const { password, student: studentData } = req.body
  
    //will we call services function to send this data
    const result = await UserServices.createStudentIntoDB(password, studentData)
  
    //send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  })