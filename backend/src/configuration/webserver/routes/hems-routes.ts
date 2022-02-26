/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '@/src/infrastructure/webserver/express/adapters/express-route-adapter'
import { adaptMiddleware } from '@/src/infrastructure/webserver/express/adapters/express-middleware-adapter'
import { makeAddHemsController } from '../../factories/controllers/hems/add-hems-controller-factory'
import { makeDeleteHemsController } from '../../factories/controllers/hems/delete-hems-controller-factory'
import { makeEditHemsRegionController } from '../../factories/controllers/hems/edit-hems-region-controller-factory'
import { makeLoadHemsController } from '../../factories/controllers/hems/load-hems-controller-factory'
import { makeAuthMiddleware } from '../../factories/middlewares/auth-middleware'

const router = Router()

router.post('/hems', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeAddHemsController()))
router.get('/hems', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeLoadHemsController()))
router.put('/hems/:hemsId', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeEditHemsRegionController()))
router.delete('/hems/:hemsId', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeDeleteHemsController()))

export { router as hemsRouter }
