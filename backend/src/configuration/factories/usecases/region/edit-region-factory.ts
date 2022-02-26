import { IEditRegion } from '@/src/usecases/boundaries/input/region/edit-region'
import { DbEditRegion } from '@/src/usecases/interactors/region/edit-region'
import { RegionMongoRepository } from '@/src/infrastructure/repositories/mongodb/region-mongo-repository'

export const makeEditRegion = (): IEditRegion => {
  const regionMongoRepository = new RegionMongoRepository()
  return new DbEditRegion(regionMongoRepository, regionMongoRepository)
}
