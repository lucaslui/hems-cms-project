import { ILoadDevicesByData } from '@/src/usecases/boundaries/input/device/load-devices-by-data'
import { ok, serverError } from '../../helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../../protocols'

export class LoadDevicesByDataController implements IController {
  constructor (
    private readonly loadDevicesByData: ILoadDevicesByData
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { page } = httpRequest.query
      const devices = await this.loadDevicesByData.load(httpRequest.userId, page)
      return ok(devices)
    } catch (error) {
      return serverError(error)
    }
  }
}
