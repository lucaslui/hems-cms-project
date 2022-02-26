import { ICheckAccessToken } from '../../usecases/boundaries/input/auth/check-access-token'
import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden, ok, serverError } from '../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IMiddleware } from '../protocols'

export class AuthMiddleware implements IMiddleware {
  constructor (
    private readonly loadAccountByToken: ICheckAccessToken,
    private readonly role?: string
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role)
        if (account) {
          return ok({ userId: account.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
