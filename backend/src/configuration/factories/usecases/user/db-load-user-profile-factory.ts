import { LoadUserProfile } from '@/src/usecases/interactors/user/load-user-profile'
import { ILoadUserProfile } from '@/src/usecases/boundaries/input/user/load-user-profile'
import { UserMongoRepository } from '@/src/infrastructure/repositories/mongodb/user-mongo-repository'

export const makeLoadUserProfile = (): ILoadUserProfile => {
  const userMongoRepository = new UserMongoRepository()
  return new LoadUserProfile(userMongoRepository)
}
