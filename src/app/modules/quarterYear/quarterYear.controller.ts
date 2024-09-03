import catchAsync from '../../utils/catchAsync'
import { QuarterYearServices } from './quarterYear.service'

const createQuarterYear = catchAsync(async (req, res) => {
  //will we call services function to send this data
  const result = await QuarterYearServices.createQuarterYearIntoDB(req.body)

  //send response
  res.status(200).json({
    success: true,
    message: 'Quarter is created successfully',
    data: result,
  })
})

export const QuarterYearControllers = {
  createQuarterYear,
}
