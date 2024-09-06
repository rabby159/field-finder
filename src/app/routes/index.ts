import { Router } from 'express'
import { UsersRoutes } from '../modules/users/users.route'
import { QuarterYearRoutes } from '../modules/quarterYear/quarterYear.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UsersRoutes,
  },
  {
    path: '/quarter',
    route: QuarterYearRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
