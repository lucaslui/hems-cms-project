import { AddRegionRepository } from '@/src/usecases/boundaries/output/repositories/region/add-region-repository'
import { DeleteRegionRepository } from '@/src/usecases/boundaries/output/repositories/region/delete-region-repository'
import { EditRegionRepository } from '@/src/usecases/boundaries/output/repositories/region/edit-region-repository'
import { LoadRegionByIdRepository } from '@/src/usecases/boundaries/output/repositories/region/load-region-by-id-repository'
import { HemsModel } from '@/src/entities/hems'
import { RegionModel } from '@/src/entities/region'
import { AddRegionModel } from '@/src/usecases/boundaries/input/region/add-region'
import { ILoadRegions, LoadRegionsQueryModel } from '@/src/usecases/boundaries/input/region/load-regions'

import { MongoHelper } from './mongo-helper'

export class RegionMongoRepository implements
AddRegionRepository,
DeleteRegionRepository,
EditRegionRepository,
LoadRegionByIdRepository,
ILoadRegions {
  async add (region: AddRegionModel): Promise<RegionModel> {
    const regionCollection = await MongoHelper.getCollection('regions')
    const result = await regionCollection.insertOne({
      name: region.name,
      description: region.description
    })
    const regionAdded = result.ops[0]
    return MongoHelper.map(regionAdded)
  }

  async edit (regionId: string, region: AddRegionModel): Promise<void> {
    const regionCollection = await MongoHelper.getCollection('regions')
    await regionCollection.updateOne({ _id: MongoHelper.toObjectId(regionId) }, { $set: { name: region.name, description: region.description } })
  }

  async delete (regionId: string): Promise<void> {
    const regionCollection = await MongoHelper.getCollection('regions')
    await regionCollection.deleteOne({ _id: MongoHelper.toObjectId(regionId) })
  }

  async load (query: LoadRegionsQueryModel): Promise<RegionModel[]> {
    const regionCollection = await MongoHelper.getCollection('regions')
    const pipeline: object[] = []

    pipeline.push({
      $sort: { _id: -1 }
    })

    if (query?.page) {
      pipeline.push({ $skip: query.page * 10 - 10 }, { $limit: 10 })
    }

    const regions = await regionCollection.aggregate(pipeline).toArray()
    return regions && MongoHelper.mapCollection(regions)
  }

  async loadById (regionId: string): Promise<HemsModel> {
    const regionCollection = await MongoHelper.getCollection('regions')
    const region = await regionCollection.findOne({ _id: MongoHelper.toObjectId(regionId) })
    return region && MongoHelper.map(region)
  }
}
