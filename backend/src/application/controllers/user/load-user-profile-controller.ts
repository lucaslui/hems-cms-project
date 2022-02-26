import { ILoadUserProfile } from '@/src/usecases/boundaries/input/user/load-user-profile'
import { ok, serverError, unauthorized } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class LoadUserProfileController implements IController {
  constructor (
    private readonly loadUserProfile: ILoadUserProfile
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const profile = await this.loadUserProfile.loadProfile(httpRequest.userId)
      if (!profile) {
        return unauthorized()
      }
      return ok(profile)
    } catch (error) {
      return serverError(error)
    }
  }
}
