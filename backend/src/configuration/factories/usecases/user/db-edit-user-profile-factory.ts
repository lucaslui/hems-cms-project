import { EditUserProfile } from '@/src/usecases/interactors/user/edit-user-profile'
import { IEditUserProfile } from '@/src/usecases/boundaries/input/user/edit-user-profile'
import { UserMongoRepository } from '@/src/infrastructure/repositories/mongodb/user-mongo-repository'

export const makeEditUserProfile = (): IEditUserProfile => {
  const userMongoRepository = new UserMongoRepository()
  return new EditUserProfile(userMongoRepository, userMongoRepository)
}
