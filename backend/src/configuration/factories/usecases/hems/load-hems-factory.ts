import { LoadHems } from '@/src/usecases/interactors/hems/load-hems'
import { ILoadHems } from '@/src/usecases/boundaries/input/hems/load-hems'
import { HemsMongoRepository } from '@/src/infrastructure/repositories/mongodb/hems-mongo-repository'

export const makeLoadHems = (): ILoadHems => {
  const hemsMongoRepository = new HemsMongoRepository()
  return new LoadHems(hemsMongoRepository)
}
