import { IAddUser } from '@/src/usecases/boundaries/input/user/add-user'
import { AddUser } from '@/src/usecases/interactors/user/add-user'
import { BcryptAdapter } from '@/src/infrastructure/criptography/bcrypt-adapter'
import { UserMongoRepository } from '@/src/infrastructure/repositories/mongodb/user-mongo-repository'

export const makeAddUser = (): IAddUser => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const userMongoRepository = new UserMongoRepository()
  return new AddUser(userMongoRepository, userMongoRepository, bcryptAdapter)
}
