import { badRequest, serverError, ok, forbidden } from '../../helpers/http-helper'
import { IValidation } from '../../protocols/validation'
import { ICreateAccount } from '../../../usecases/boundaries/input/auth/create-account'
import { IHttpRequest, IController, IHttpResponse } from '../../protocols'
import { EmailInUseError } from '../../errors'

export class SignUpController implements IController {
  constructor (
    private readonly addAccount: ICreateAccount,
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      const addAccountResponse = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!addAccountResponse) {
        return forbidden(new EmailInUseError())
      }
      return ok(addAccountResponse)
    } catch (error) {
      return serverError(error)
    }
  }
}
