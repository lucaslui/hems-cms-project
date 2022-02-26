import request from 'supertest'

import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'

import env from '@/src/configuration/config/env'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import app from '@/src/configuration/config/app'

let accountCollection: Collection

interface MockType {
  accessToken: string
  id: string
}

const mockAccessToken = async (): Promise<MockType> => {
  const res = await accountCollection.insertOne({
    name: 'lucas',
    email: 'lucasluimotta@gmail.com',
    password: '123'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return { accessToken, id }
}

describe('Bind Hems Routes', () => {
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

  test('Should return 403 if the request does not have accessToken', async () => {
    await request(app)
      .put('/api/users/any_hems_id')
      .expect(403)
  })

  test('Should return 403 if the request is valid but already have an account with this hemsId', async () => {
    const { accessToken, id } = await mockAccessToken()
    await accountCollection.updateOne({
      _id: id
    }, {
      $set: {
        hemsId: 'any_hems_id'
      }
    })
    await request(app)
      .put('/api/users/any_hems_id')
      .set('x-access-token', accessToken)
      .send({
        hemsId: 'any_hems_id'
      })
      .expect(403)
  })

  test('Should return 204 on success', async () => {
    const { accessToken } = await mockAccessToken()
    await request(app)
      .put('/api/users/any_hems_id')
      .set('x-access-token', accessToken)
      .send({
        hemsId: 'any_hems_id'
      })
      .expect(204)
  })
})
