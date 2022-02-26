import { IDeleteDevice } from '@/src/usecases/boundaries/input/device/delete-device'
import { noContent, notFound, serverError } from '../../helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../../protocols'

export class DeleteHemsDeviceController implements IController {
  constructor (
    private readonly deleteDevice: IDeleteDevice
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { deviceId } = httpRequest.params
      const isSuccessful = await this.deleteDevice.delete(httpRequest.userId, deviceId)
      if (!isSuccessful) {
        return notFound()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
