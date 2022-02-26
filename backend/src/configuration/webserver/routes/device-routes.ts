/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '@/src/infrastructure/webserver/express/adapters/express-route-adapter'
import { adaptMiddleware } from '@/src/infrastructure/webserver/express/adapters/express-middleware-adapter'
import { makeAddHemsDeviceController } from '../../factories/controllers/device/add-device-controller-factory'
import { makeDeleteHemsDeviceController } from '../../factories/controllers/device/delete-device-controller-factory'
import { makeEditHemsDeviceNicknameController } from '../../factories/controllers/device/edit-device-nickname-controller-factory'
import { makeLoadHemsDevicesController } from '../../factories/controllers/device/load-devices-controller-factory'
import { makeAuthMiddleware } from '../../factories/middlewares/auth-middleware'
import { makeLoadDevicesAdminController } from '../../factories/controllers/device/load-devices-admin-controller-factory'
import { makeLoadDevicesByDataAdminController } from '../../factories/controllers/device/load-devices-by-data-admin-controller-factory'
import { makeLoadDevicesByDataController } from '../../factories/controllers/device/load-devices-by-data-controller-factory'

const router = Router()

router.post('/devices', adaptMiddleware(makeAuthMiddleware('customer')), adaptRoute(makeAddHemsDeviceController()))
router.get('/devices', adaptMiddleware(makeAuthMiddleware('customer')), adaptRoute(makeLoadHemsDevicesController()))
router.get('/devices/admin/:hemsId', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeLoadDevicesAdminController()))
router.get('/devices/byData', adaptMiddleware(makeAuthMiddleware('customer')), adaptRoute(makeLoadDevicesByDataController()))
router.get('/devices/byData/admin/:hemsId', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeLoadDevicesByDataAdminController()))
router.put('/devices/:deviceId', adaptMiddleware(makeAuthMiddleware('customer')), adaptRoute(makeEditHemsDeviceNicknameController()))
router.delete('/devices/:deviceId', adaptMiddleware(makeAuthMiddleware('customer')), adaptRoute(makeDeleteHemsDeviceController()))

export { router as deviceRouter }
