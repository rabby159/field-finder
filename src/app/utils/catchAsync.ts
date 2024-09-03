import { NextFunction, Request, RequestHandler, Response } from 'express'

//higher order function
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, Next: NextFunction) => {
    Promise.resolve(fn(req, res, Next)).catch((err) => Next(err))
  }
}

export default catchAsync
