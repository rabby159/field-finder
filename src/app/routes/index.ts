import { Router } from 'express'
import { UsersRoutes } from '../modules/users/users.route'
import { QuarterYearRoutes } from '../modules/quarterYear/quarterYear.route'
import { UserRoutes } from '../modules/user/user.route'

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
  {
    path: '/user',
    route: UserRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
