import { DbDeleteRegion } from '@/src/usecases/interactors/region/delete-region'
import { IDeleteRegion } from '@/src/usecases/boundaries/input/region/delete-region'
import { RegionMongoRepository } from '@/src/infrastructure/repositories/mongodb/region-mongo-repository'

export const makeDeleteRegion = (): IDeleteRegion => {
  const regionMongoRepository = new RegionMongoRepository()
  return new DbDeleteRegion(regionMongoRepository, regionMongoRepository)
}
