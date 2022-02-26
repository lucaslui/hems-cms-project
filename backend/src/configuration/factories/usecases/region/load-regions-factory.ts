import { DbLoadRegions } from '@/src/usecases/interactors/region/load-regions'
import { ILoadRegions } from '@/src/usecases/boundaries/input/region/load-regions'
import { RegionMongoRepository } from '@/src/infrastructure/repositories/mongodb/region-mongo-repository'

export const makeLoadRegions = (): ILoadRegions => {
  const regionMongoRepository = new RegionMongoRepository()
  return new DbLoadRegions(regionMongoRepository)
}
