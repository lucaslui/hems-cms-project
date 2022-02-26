import { RegionMongoRepository } from '@/src/infrastructure/repositories/mongodb/region-mongo-repository'
import { DbAddRegion } from '@/src/usecases/interactors/region/add-region'
import { IAddRegion } from '@/src/usecases/boundaries/input/region/add-region'

export const makeAddRegion = (): IAddRegion => {
  const regionMongoRepository = new RegionMongoRepository()
  return new DbAddRegion(regionMongoRepository)
}
