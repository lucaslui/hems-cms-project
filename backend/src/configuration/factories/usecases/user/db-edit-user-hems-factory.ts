import { UserMongoRepository } from '../../../../infrastructure/repositories/mongodb/user-mongo-repository'
import { IEditUserHems } from '../../../../usecases/boundaries/input/user/edit-user-hems'
import { EditUserHems } from '../../../../usecases/interactors/user/edit-user-hems'
import { HemsMongoRepository } from '@/src/infrastructure/repositories/mongodb/hems-mongo-repository'

export const makeEditUserHems = (): IEditUserHems => {
  const userMongoRepository = new UserMongoRepository()
  const hemsMongoRepository = new HemsMongoRepository()
  return new EditUserHems(userMongoRepository, userMongoRepository, hemsMongoRepository)
}
