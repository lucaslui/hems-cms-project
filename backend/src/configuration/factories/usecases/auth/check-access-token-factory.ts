import { UserMongoRepository } from '../../../../infrastructure/repositories/mongodb/user-mongo-repository'
import { CheckAccessToken } from '../../../../usecases/interactors/auth/check-access-token'
import { JwtAdapter } from '../../../../infrastructure/criptography/jwt-adapter'
import { ICheckAccessToken } from '../../../../usecases/boundaries/input/auth/check-access-token'

import env from '@/src/configuration/env'

export const makeCheckAccessToken = (): ICheckAccessToken => {
  const secret = env.jwtSecret
  const jwtAdapter = new JwtAdapter(secret)
  const userMongoRepository = new UserMongoRepository()
  return new CheckAccessToken(jwtAdapter, userMongoRepository)
}
