import { Express } from 'express'
import { userRouter } from './routes/user-routes'
import { authRouter } from './routes/auth-routes'
import { dataRouter } from './routes/data-routes'
import { hemsRouter } from './routes/hems-routes'
import { regionRouter } from './routes/region-routes'
import { deviceRouter } from './routes/device-routes'
import { roomRouter } from './routes/room-routes'
import { tariffRouter } from './routes/tariff-routes'

export default (app: Express): void => {
  app.use('/api', authRouter)
  app.use('/api', userRouter)
  app.use('/api', deviceRouter)
  app.use('/api', hemsRouter)
  app.use('/api', regionRouter)
  app.use('/api', roomRouter)
  app.use('/api', tariffRouter)
  app.use('/api', dataRouter)
}
