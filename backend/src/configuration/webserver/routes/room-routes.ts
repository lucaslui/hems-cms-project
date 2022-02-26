/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '@/src/infrastructure/webserver/express/adapters/express-route-adapter'
import { adaptMiddleware } from '@/src/infrastructure/webserver/express/adapters/express-middleware-adapter'

import { makeAuthMiddleware } from '../../factories/middlewares/auth-middleware'
import { makeAddRoomController } from '../../factories/controllers/room/add-room-controller-factory'
import { makeLoadRoomsController } from '../../factories/controllers/room/load-room-controller-factory'
import { makeEditRoomController } from '../../factories/controllers/room/edit-room-controller-factory'
import { makeDeleteRoomController } from '../../factories/controllers/room/delete-room-controller-factory'

const router = Router()

router.post('/rooms', adaptMiddleware(makeAuthMiddleware('customer')), adaptRoute(makeAddRoomController()))
router.get('/rooms', adaptMiddleware(makeAuthMiddleware('customer')), adaptRoute(makeLoadRoomsController()))
router.put('/rooms/:roomId', adaptMiddleware(makeAuthMiddleware('customer')), adaptRoute(makeEditRoomController()))
router.delete('/rooms/:roomId', adaptMiddleware(makeAuthMiddleware('customer')), adaptRoute(makeDeleteRoomController()))

export { router as roomRouter }
