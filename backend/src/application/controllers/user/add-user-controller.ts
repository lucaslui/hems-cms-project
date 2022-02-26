import { IAddUser } from '@/src/usecases/boundaries/input/user/add-user'
import { badRequest, noContent, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController, IValidation } from '../../protocols'

export class AddUserController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly addUser: IAddUser
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password, role } = httpRequest.body
      await this.addUser.add({ name, email, password, role })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
