import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { QuarterYearRoutes } from '../modules/quarterYear/quarterYear.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/quarter',
    route: QuarterYearRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
