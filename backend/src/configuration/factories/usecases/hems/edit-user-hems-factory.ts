import { HemsMongoRepository } from '@/src/infrastructure/repositories/mongodb/hems-mongo-repository'
import { IEditHemsRegion } from '@/src/usecases/boundaries/input/hems/edit-hems-region'
import { EditHemsRegion } from '@/src/usecases/interactors/hems/edit-hems-region'

export const makeEditHemsRegion = (): IEditHemsRegion => {
  const hemsMongoRepository = new HemsMongoRepository()
  return new EditHemsRegion(hemsMongoRepository, hemsMongoRepository)
}
