import { ILoadTariff } from '@/src/usecases/boundaries/input/tariff/load-tariff'
import { ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class LoadTariffController implements IController {
  constructor (
    private readonly loadTariff: ILoadTariff
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { page } = httpRequest.query
      const users = await this.loadTariff.load({ page })
      return ok(users)
    } catch (error) {
      return serverError(error)
    }
  }
}
