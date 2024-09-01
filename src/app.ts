import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'

const app: Application = express()

//parser
app.use(express.json())
app.use(cors())

//application routes

// application routes
app.use('/api/v1', router)

const test = (req: Request, res: Response) => {
  const a = 10
  res.send(a)
}

app.get('/', test)

export default app
