import { BcryptAdapter } from '../../../../infrastructure/criptography/bcrypt-adapter'
import { UserMongoRepository } from '../../../../infrastructure/repositories/mongodb/user-mongo-repository'
import { ICreateAccount } from '../../../../usecases/boundaries/input/auth/create-account'
import { CreateAccount } from '../../../../usecases/interactors/auth/create-account'
import { JwtAdapter } from '@/src/infrastructure/criptography/jwt-adapter'

import env from '@/src/configuration/env'

export const makeCreateAccount = (): ICreateAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const userMongoRepository = new UserMongoRepository()
  return new CreateAccount(bcryptAdapter, jwtAdapter, userMongoRepository, userMongoRepository, userMongoRepository)
}
