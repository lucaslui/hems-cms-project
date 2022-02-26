import { ILoadHems } from '@/src/usecases/boundaries/input/hems/load-hems'
import { ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class LoadHemsController implements IController {
  constructor (
    private readonly loadHems: ILoadHems
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { regionId, page } = httpRequest.query
      const hems = await this.loadHems.load({ regionId, page })
      return ok(hems)
    } catch (error) {
      return serverError(error)
    }
  }
}
