import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import app from '@/src/configuration/config/app'

import request from 'supertest'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('users')
    await accountCollection.deleteMany({})
  })

  test('Should return 200 on success of signup', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Lucas',
        email: 'lucasluimotta@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
