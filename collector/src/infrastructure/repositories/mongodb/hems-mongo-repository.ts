import { HemsModel } from '@/src/entities/hems'
import { LoadHemsByIdRepository } from '@/src/usecases/boundaries/output/repositories/load-hems-by-id-repository'
import { MongoHelper } from './mongo-helper'

export class HemsMongoRepository implements LoadHemsByIdRepository {
  async loadById (hemsId: string): Promise<HemsModel> {
    const hemsCollection = await MongoHelper.getCollection('hems')
    const hems = await hemsCollection.findOne({ _id: hemsId })
    return hems && MongoHelper.map(hems)
  }
}
