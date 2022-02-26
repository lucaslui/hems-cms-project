import { ILoadDevicesByDataAdmin } from '@/src/usecases/boundaries/input/device/load-devices-by-data-admin'
import { ok, serverError } from '../../helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../../protocols'

export class LoadDevicesByDataAdminController implements IController {
  constructor (
    private readonly loadDevicesByDataAdmin: ILoadDevicesByDataAdmin
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { page } = httpRequest.query
      const { hemsId } = httpRequest.params
      const devices = await this.loadDevicesByDataAdmin.load(hemsId, page)
      return ok(devices)
    } catch (error) {
      return serverError(error)
    }
  }
}
