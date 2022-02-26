import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import app from '@/src/configuration/config/app'

import request from 'supertest'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('users')
    await accountCollection.deleteMany({})
  })

  test('Should return 200 on authorized login', async () => {
    const salt = 12
    const password = '123'
    const passwordHashed = await hash(password, salt)
    await accountCollection.insertOne({
      name: 'Lucas',
      email: 'lucasluimotta@gmail.com',
      password: passwordHashed
    })
    await request(app)
      .post('/api/login')
      .send({
        email: 'lucasluimotta@gmail.com',
        password: '123'
      })
      .expect(200)
  })

  test('Should return 401 on not-found user', async () => {
    await request(app)
      .post('/api/login')
      .send({
        email: 'lucasluimotta@gmail.com',
        password: '123'
      })
      .expect(401)
  })
})
