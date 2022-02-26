import { IAddDevice } from '@/src/usecases/boundaries/input/device/add-device'
import { badRequest, noContent, notFound, serverError } from '../../helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse, IValidation } from '../../protocols'

export class AddDeviceController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly addDevice: IAddDevice
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { deviceId, deviceType, roomId } = httpRequest.body
      const isSuccessful = await this.addDevice.add({ id: deviceId, type: deviceType, roomId }, httpRequest.userId)
      if (!isSuccessful) {
        return notFound()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
