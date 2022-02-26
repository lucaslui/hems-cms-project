import { Authenticate } from '../../../../usecases/interactors/auth/authenticate'
import { BcryptAdapter } from '../../../../infrastructure/criptography/bcrypt-adapter'
import { JwtAdapter } from '../../../../infrastructure/criptography/jwt-adapter'
import { UserMongoRepository } from '../../../../infrastructure/repositories/mongodb/user-mongo-repository'
import { IAuthenticate } from '../../../../usecases/boundaries/input/auth/authenticate'

import env from '@/src/configuration/env'

export const makeAuthenticate = (): IAuthenticate => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const userMongoRepository = new UserMongoRepository()
  return new Authenticate(userMongoRepository, bcryptAdapter, jwtAdapter, userMongoRepository)
}
