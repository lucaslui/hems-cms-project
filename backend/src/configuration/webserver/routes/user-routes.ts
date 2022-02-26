/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '@/src/infrastructure/webserver/express/adapters/express-route-adapter'
import { adaptMiddleware } from '@/src/infrastructure/webserver/express/adapters/express-middleware-adapter'
import { makeAddUserController } from '../../factories/controllers/user/add-user-controller-factory'
import { makeDeleteUserController } from '../../factories/controllers/user/delete-user-controller-factory'
import { makeEditUserHemsController } from '../../factories/controllers/user/edit-user-hems-controller-factory'
import { makeEditUserProfileController } from '../../factories/controllers/user/edit-user-profile-controller-factory'
import { makeLoadUserProfileController } from '../../factories/controllers/user/load-user-profile-controller-factory'
import { makeLoadUsersController } from '../../factories/controllers/user/load-users-controller-factory'
import { makeAuthMiddleware } from '../../factories/middlewares/auth-middleware'
import { makeLoadUserHemsController } from '../../factories/controllers/user/load-user-hems-controller-factory'
import { makeEditUserController } from '../../factories/controllers/user/edit-user-controller-factory'

const router = Router()

router.get('/users/hems', adaptMiddleware(makeAuthMiddleware('customer')), adaptRoute(makeLoadUserHemsController()))
router.put('/users/hems/:hemsId', adaptMiddleware(makeAuthMiddleware('customer')), adaptRoute(makeEditUserHemsController()))
router.put('/users/profile', adaptMiddleware(makeAuthMiddleware('customer')), adaptRoute(makeEditUserProfileController()))
router.get('/users/profile', adaptMiddleware(makeAuthMiddleware('customer')), adaptRoute(makeLoadUserProfileController()))

router.post('/users', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeAddUserController()))
router.get('/users', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeLoadUsersController()))
router.put('/users/:userId', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeEditUserController()))
router.delete('/users/:userId', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeDeleteUserController()))

export { router as userRouter }
