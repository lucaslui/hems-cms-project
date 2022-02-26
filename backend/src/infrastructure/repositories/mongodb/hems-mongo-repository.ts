import { AddHemsRepository } from '@/src/usecases/boundaries/output/repositories/hems/add-hems-repository'
import { DeleteHemsRepository } from '@/src/usecases/boundaries/output/repositories/hems/delete-hems-repository'
import { EditHemsRegionRepository } from '@/src/usecases/boundaries/output/repositories/hems/edit-hems-region-repository'
import { LoadHemsByIdRepository } from '@/src/usecases/boundaries/output/repositories/hems/load-hems-by-id-repository'
import { LoadHemsRepository } from '@/src/usecases/boundaries/output/repositories/hems/load-hems-repository'
import { HemsModel } from '@/src/entities/hems'
import { LoadHemsQueryModel } from '@/src/usecases/boundaries/input/hems/load-hems'
import { MongoHelper } from './mongo-helper'

export class HemsMongoRepository implements
AddHemsRepository,
DeleteHemsRepository,
EditHemsRegionRepository,
LoadHemsByIdRepository,
LoadHemsRepository {
  async add (hems: HemsModel): Promise<void> {
    const hemsCollection = await MongoHelper.getCollection('hems')
    await hemsCollection.insertOne({
      _id: hems.id,
      regionId: hems.regionId,
      mqttUsername: hems.mqttUsername,
      mqttPassword: hems.mqttPassword,
      publishACL: ['hems/data'],
      subscribeACL: [`hems/commands/${hems.id}`]
    })
  }

  async editRegion (hemsId: string, regionId: string): Promise<void> {
    const hemsCollection = await MongoHelper.getCollection('hems')
    await hemsCollection.updateOne({ _id: hemsId }, { $set: { regionId } })
  }

  async delete (hemsId: string): Promise<void> {
    const hemsCollection = await MongoHelper.getCollection('hems')
    const usersCollection = await MongoHelper.getCollection('users')
    const devicesCollection = await MongoHelper.getCollection('devices')
    await devicesCollection.deleteMany({ hemsId })
    await usersCollection.updateMany({ hemsId }, { $unset: { hemsId: 1 } })
    await hemsCollection.deleteOne({ _id: hemsId })
  }

  async load (query: LoadHemsQueryModel): Promise<HemsModel[]> {
    const hemsCollection = await MongoHelper.getCollection('hems')
    const pipeline: object[] = []

    if (query?.regionId) {
      pipeline.push({ $match: { regionId: query.regionId } })
    }

    pipeline.push({
      $project: {
        _id: false,
        id: '$_id',
        key: '$key',
        regionId: '$regionId'
      }
    })

    pipeline.push({
      $sort: { id: -1 }
    })

    if (query?.page) {
      pipeline.push({ $skip: query.page * 10 - 10 }, { $limit: 10 })
    }

    const hems = await hemsCollection.aggregate(pipeline).toArray()
    return hems
  }

  async loadById (hemsId: string): Promise<HemsModel> {
    const hemsCollection = await MongoHelper.getCollection('hems')
    const hems = await hemsCollection.findOne({ _id: hemsId })
    return hems && MongoHelper.map(hems)
  }
}
