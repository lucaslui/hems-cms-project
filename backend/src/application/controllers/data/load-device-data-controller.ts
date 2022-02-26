import { ILoadData } from '../../../usecases/boundaries/input/data/load-data-by-query'
import { AccountWithoutBoundHemsError } from '../../errors/account-without-bound-hems'
import { badRequest, forbidden, ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IValidation } from '../../protocols'
import { IController } from '../../protocols/controller'

export class LoadDeviceDataController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly loadDeviceDataByQuery: ILoadData
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { query, params, userId } = httpRequest
      const error = this.validation.validate(params)
      if (error) {
        return badRequest(error)
      }
      const data = await this.loadDeviceDataByQuery.loadDeviceData({ ...query, ...params }, userId)
      if (!data) {
        return forbidden(new AccountWithoutBoundHemsError())
      }
      return ok(data)
    } catch (error) {
      return serverError(error)
    }
  }
}
