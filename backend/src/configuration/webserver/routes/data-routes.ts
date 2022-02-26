/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '@/src/infrastructure/webserver/express/adapters/express-route-adapter'
import { adaptMiddleware } from '@/src/infrastructure/webserver/express/adapters/express-middleware-adapter'
import { makeLoadDeviceDataController } from '../../factories/controllers/data/load-record-controller-factory'
import { makeAuthMiddleware } from '../../factories/middlewares/auth-middleware'

const router = Router()

router.get('/data/:deviceId', adaptMiddleware(makeAuthMiddleware('customer')), adaptRoute(makeLoadDeviceDataController()))

export { router as dataRouter }
