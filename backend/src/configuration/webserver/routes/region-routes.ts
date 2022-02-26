/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '@/src/infrastructure/webserver/express/adapters/express-route-adapter'
import { adaptMiddleware } from '@/src/infrastructure/webserver/express/adapters/express-middleware-adapter'
import { makeAddRegionController } from '../../factories/controllers/region/add-region-controller-factory'
import { makeDeleteRegionController } from '../../factories/controllers/region/delete-region-controller-factory'
import { makeEditRegionController } from '../../factories/controllers/region/edit-region-controller-factory'
import { makeLoadRegionsController } from '../../factories/controllers/region/load-regions-controller-factory'
import { makeAuthMiddleware } from '../../factories/middlewares/auth-middleware'

const router = Router()

router.post('/regions', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeAddRegionController()))
router.get('/regions', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeLoadRegionsController()))
router.put('/regions/:regionId', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeEditRegionController()))
router.delete('/regions/:regionId', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeDeleteRegionController()))

export { router as regionRouter }
