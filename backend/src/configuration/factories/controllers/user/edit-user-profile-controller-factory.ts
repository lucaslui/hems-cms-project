import { EditUserProfileController } from '@/src/application/controllers/user/edit-user-profile-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeEditUserProfile } from '../../usecases/user/db-edit-user-profile-factory'
import { makeEditUserProfileValidation } from '../../validations/user/edit-user-profile-validation-factory'

export const makeEditUserProfileController = (): IController => {
  const editUserProfileController = new EditUserProfileController(makeEditUserProfileValidation(), makeEditUserProfile())
  return makeLogControllerDecorator(editUserProfileController)
}
