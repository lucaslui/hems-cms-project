import { AuthMiddleware } from '../../../application/middlewares/auth-middleware'
import { IMiddleware } from '../../../application/protocols'
import { makeCheckAccessToken } from '../usecases/auth/check-access-token-factory'

export const makeAuthMiddleware = (role?: string): IMiddleware => {
  const loadAccountByToken = makeCheckAccessToken()
  return new AuthMiddleware(loadAccountByToken, role)
}
