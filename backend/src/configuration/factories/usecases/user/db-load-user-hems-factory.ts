import { UserMongoRepository } from '@/src/infrastructure/repositories/mongodb/user-mongo-repository'
import { ILoadUserHems } from '@/src/usecases/boundaries/input/user/load-user-hems'
import { LoadUserHems } from '@/src/usecases/interactors/user/load-user-hems'

export const makeLoadUserHems = (): ILoadUserHems => {
  const userMongoRepository = new UserMongoRepository()
  return new LoadUserHems(userMongoRepository)
}
