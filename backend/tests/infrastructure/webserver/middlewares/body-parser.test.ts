import app from '@/src/configuration/config/app'

import request from 'supertest'

describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/test_body_parser', (req,res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Lucas' })
      .expect({ name: 'Lucas' })
  })
})
