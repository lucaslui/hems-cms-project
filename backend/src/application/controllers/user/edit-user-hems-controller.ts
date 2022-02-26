import { IEditUserHems } from '../../../usecases/boundaries/input/user/edit-user-hems'
import { HemsInUseError } from '../../errors/hems-in-use-error'
import { forbidden, noContent, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class EditUserHemsController implements IController {
  constructor (
    private readonly editUserHems: IEditUserHems
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { hemsId } = httpRequest.params
      const isEdited = await this.editUserHems.editHems(hemsId, httpRequest.userId)
      if (!isEdited) {
        return forbidden(new HemsInUseError())
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
