import { LoadTariffQueryModel } from '@/src/usecases/boundaries/input/tariff/load-tariff'
import { EditTariffRepository } from '@/src/usecases/boundaries/output/repositories/tariff/edit-tariff-repository'
import { LoadTariffRepository } from '@/src/usecases/boundaries/output/repositories/tariff/load-tariff-repository'
import { TariffModel } from '@/src/entities/tariff'
import { MongoHelper } from './mongo-helper'

export class TariffMongoRepository
implements
  EditTariffRepository,
  LoadTariffRepository {
  async edit (tariff: TariffModel): Promise<void> {
    const tariffCollection = await MongoHelper.getCollection('tariff')
    await tariffCollection.updateOne({ }, {
      $set: {
        tariffTusd: tariff.tariffTusd,
        tariffTe: tariff.tariffTe,
        tariffFlag: tariff.tariffFlag
      }
    }, { upsert: true })
  }

  async load (query: LoadTariffQueryModel): Promise<TariffModel> {
    const tariffCollection = await MongoHelper.getCollection('tariff')
    const pipeline: object[] = []
    pipeline.push({
      $project: {
        _id: false,
        tariffTusd: '$tariffTusd',
        tariffTe: '$tariffTe',
        tariffFlag: '$tariffFlag'
      }
    })

    if (query?.page) {
      pipeline.push({ $skip: query.page * 10 - 10 }, { $limit: 10 })
    }
    const tariff = await tariffCollection.aggregate(pipeline).toArray()
    return tariff[0]
  }
}
