import { IEditUserProfile } from '@/src/usecases/boundaries/input/user/edit-user-profile'
import { badRequest, noContent, notFound, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController, IValidation } from '../../protocols'

export class EditUserProfileController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly editUserProfile: IEditUserProfile
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { cpf, rg, birthdate, cep, street, number, district, state, city, complement, phone } = httpRequest.body
      const isEdited = await this.editUserProfile.editProfile({ cpf, rg, birthdate, cep, street, number, district, state, city, complement, phone }, httpRequest.userId)
      if (!isEdited) {
        return notFound()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
