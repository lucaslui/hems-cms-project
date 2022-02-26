import { ILoadUserHems } from '@/src/usecases/boundaries/input/user/load-user-hems'
import { ok, serverError, unauthorized } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class LoadUserHemsController implements IController {
  constructor (
    private readonly loadUserHems: ILoadUserHems
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const hems = await this.loadUserHems.loadHems(httpRequest.userId)
      if (!hems) {
        return unauthorized()
      }
      return ok(hems)
    } catch (error) {
      return serverError(error)
    }
  }
}
