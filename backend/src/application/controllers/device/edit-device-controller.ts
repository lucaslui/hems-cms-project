import { IEditDevice } from '@/src/usecases/boundaries/input/device/edit-device'
import { badRequest, noContent, notFound, serverError } from '../../helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse, IValidation } from '../../protocols'

export class EditHemsDeviceNicknameController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly editHemsDeviceNickname: IEditDevice
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { deviceType, roomId } = httpRequest.body
      const { deviceId } = httpRequest.params
      const isSuccessful = await this.editHemsDeviceNickname.editDevice({ id: deviceId, type: deviceType, roomId }, httpRequest.userId)
      if (!isSuccessful) {
        return notFound()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
