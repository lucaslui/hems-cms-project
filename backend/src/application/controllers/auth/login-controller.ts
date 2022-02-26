import { IAuthenticate } from '../../../usecases/boundaries/input/auth/authenticate'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse, IValidation } from '../../protocols'

export class LoginController implements IController {
  constructor (
    private readonly authentication: IAuthenticate,
    private readonly validation: IValidation
  ) { }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const account = await this.authentication.auth({
        email,
        password
      })
      if (!account) {
        return unauthorized()
      }
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
