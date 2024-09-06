import catchAsync from "../../utils/catchAsync"
import { UserServices } from "./user.service"

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB(req.query)

  res.status(200).json({
    success: true,
    message: 'User details get successfully',
    data: result,
  })
})

export const UserControllers = {
    getAllUser
}
