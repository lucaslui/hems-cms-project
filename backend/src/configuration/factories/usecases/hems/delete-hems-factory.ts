import { DeleteHems } from '@/src/usecases/interactors/hems/delete-hems'
import { IDeleteHems } from '@/src/usecases/boundaries/input/hems/delete-hems'
import { HemsMongoRepository } from '@/src/infrastructure/repositories/mongodb/hems-mongo-repository'

export const makeDeleteHems = (): IDeleteHems => {
  const hemsMongoRepository = new HemsMongoRepository()
  return new DeleteHems(hemsMongoRepository, hemsMongoRepository)
}
