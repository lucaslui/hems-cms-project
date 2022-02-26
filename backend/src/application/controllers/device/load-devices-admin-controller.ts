import { ILoadDevicesAdmin } from '@/src/usecases/boundaries/input/device/load-devices-admin'
import { ok, serverError } from '../../helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../../protocols'

export class LoadDevicesAdminController implements IController {
  constructor (
    private readonly loadDevicesAdmin: ILoadDevicesAdmin
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { page } = httpRequest.query
      const { hemsId } = httpRequest.params
      const region = await this.loadDevicesAdmin.loadDevicesAdmin(hemsId, page)
      return ok(region)
    } catch (error) {
      return serverError(error)
    }
  }
}
