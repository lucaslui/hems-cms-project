import { Express } from 'express'
import { serve, setup } from 'swagger-ui-express'

import swaggerConfig from '../../infrastructure/documentation/swagger'
import { noCache } from '../../infrastructure/webserver/express/middlewares/no-cache'

export default (app: Express): void => {
  app.use('/docs', noCache, serve, setup(swaggerConfig))
}
