import app from '@/src/configuration/config/app'
import { noCache } from '@/src/infrastructure/webserver/express/middlewares/no-cache'

import request from 'supertest'

describe('NoCache Middleware', () => {
  test('Should disable cache', async () => {
    app.get('/test_no_cache', noCache, (req,res) => {
      res.send()
    })
    await request(app)
      .get('/test_no_cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
