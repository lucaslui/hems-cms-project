import { ILoadDevices } from '@/src/usecases/boundaries/input/device/load-devices'
import { ok, serverError } from '../../helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../../protocols'

export class LoadDevicesController implements IController {
  constructor (
    private readonly loadDevices: ILoadDevices
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { page } = httpRequest.query
      const devices = await this.loadDevices.load(httpRequest.userId, page)
      return ok(devices)
    } catch (error) {
      return serverError(error)
    }
  }
}
