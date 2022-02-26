import { LoadUserProfileController } from '@/src/application/controllers/user/load-user-profile-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeLoadUserProfile } from '../../usecases/user/db-load-user-profile-factory'

export const makeLoadUserProfileController = (): IController => {
  const loadUserProfileController = new LoadUserProfileController(makeLoadUserProfile())
  return makeLogControllerDecorator(loadUserProfileController)
}
