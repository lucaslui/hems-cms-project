import { ILoadRegions } from '@/src/usecases/boundaries/input/region/load-regions'
import { ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class LoadRegionsController implements IController {
  constructor (
    private readonly loadRegions: ILoadRegions
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { page } = httpRequest.query
      const regions = await this.loadRegions.load({ page })
      return ok(regions)
    } catch (error) {
      return serverError(error)
    }
  }
}
