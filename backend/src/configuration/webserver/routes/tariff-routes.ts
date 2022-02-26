/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '@/src/infrastructure/webserver/express/adapters/express-route-adapter'
import { adaptMiddleware } from '@/src/infrastructure/webserver/express/adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../../factories/middlewares/auth-middleware'
import { makeEditTariffController } from '../../factories/controllers/tariff/edit-tariff-controller-factory'
import { makeLoadTariffController } from '../../factories/controllers/tariff/load-tariff-controller-factory'

const router = Router()

router.get('/tariff', adaptMiddleware(makeAuthMiddleware('customer')), adaptRoute(makeLoadTariffController()))
router.put('/tariff', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeEditTariffController()))

export { router as tariffRouter }
