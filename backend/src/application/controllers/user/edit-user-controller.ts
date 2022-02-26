import { IEditUser } from '@/src/usecases/boundaries/input/user/edit-user'
import { badRequest, noContent, notFound, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController, IValidation } from '../../protocols'

export class EditUserController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly editUser: IEditUser
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { userId } = httpRequest.params
      const { hemsId, role } = httpRequest.body
      const isEdited = await this.editUser.edit({ id: userId, hemsId, role })
      if (!isEdited) {
        return notFound()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
