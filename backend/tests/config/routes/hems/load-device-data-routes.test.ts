import request from 'supertest'

import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'

import env from '@/src/configuration/config/env'
import app from '@/src/configuration/config/app'
import { HemsDataModel, DeviceDataModel, MeasureDataModel } from '@/src/entities/data'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'

const makeFakeHemsData = (hemsId): HemsDataModel => {
  return ({
    hemsId: hemsId,
    devices: makeFakeDevicesData(),
    time: new Date('2021-01-27T13:23:15.450Z')
  })
}

const makeFakeDevicesData = (): DeviceDataModel[] => {
  return ([{
    deviceId: 'device_id_1',
    measures: makeFakeMeasuresData()
  } , {
    deviceId: 'device_id_2',
    measures: makeFakeMeasuresData()
  }])
}

const makeFakeMeasuresData = (): MeasureDataModel[] => {
  return ([{
    voltage: 127.3,
    current: 0,
    activePower: 0,
    reactivePower: 0,
    apparentPower: 0,
    powerFactor: 0,
    time: new Date('2021-01-27T13:23:15.450Z')
  }, {
    voltage: 127.3,
    current: 0,
    activePower: 0,
    reactivePower: 0,
    apparentPower: 0,
    powerFactor: 0,
    time: new Date('2021-01-27T13:23:15.450Z')
  }])
}

// const makeFakePointsData = (): ValueDataModel[] => {
//   return ([{
//     value: 350.10,
//     timeStamp: new Date('2021-01-27T13:23:15.450Z')
//   }, {
//     value: 350.52,
//     timeStamp: new Date('2021-01-27T13:23:15.450Z')
//   }])
// }

let userCollection: Collection
let recordCollection: Collection

interface MockType {
  accessToken: string
  id: string
}

const mockAccessToken = async (): Promise<MockType> => {
  const res = await userCollection.insertOne({
    name: 'lucas',
    email: 'lucasluimotta@gmail.com',
    password: '123'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await userCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken: accessToken
    }
  })
  return { accessToken, id }
}

describe('LoadDeviceData Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    recordCollection = await MongoHelper.getCollection('data')
    await recordCollection.deleteMany({})
    userCollection = await MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  test('Should return 403 if the request does not have accessToken', async () => {
    await request(app)
      .get('/api/data/device_id_1')
      .query({ granularity: 15 })
      .expect(403)
  })

  test('Should return 403 if the request is valid but account does not have any hemsId', async () => {
    const { accessToken } = await mockAccessToken()
    await request(app)
      .get('/api/data/device_id_1')
      .set('x-access-token', accessToken)
      .query({ granularity: 15 })
      .expect(403)
  })

  test('Should return 200 on success', async () => {
    const { id, accessToken } = await mockAccessToken()
    const hemsId = 'any_hems_id'
    await userCollection.updateOne({
      _id: id
    }, {
      $set: {
        hemsId: hemsId
      }
    })
    await recordCollection.insertOne(makeFakeHemsData(hemsId))
    await request(app)
      .get('/api/data/device_id_1')
      .set('x-access-token', accessToken)
      .query({ granularity: 15 })
      .expect(200)
  })
})
