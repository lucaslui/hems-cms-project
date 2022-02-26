import { LoadUsers } from '@/src/usecases/interactors/user/load-users'
import { ILoadUsers } from '@/src/usecases/boundaries/input/user/load-users'
import { UserMongoRepository } from '@/src/infrastructure/repositories/mongodb/user-mongo-repository'

export const makeLoadUsers = (): ILoadUsers => {
  const userMongoRepository = new UserMongoRepository()
  return new LoadUsers(userMongoRepository)
}
