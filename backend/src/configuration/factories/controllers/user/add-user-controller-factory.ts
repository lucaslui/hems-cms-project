import { AddUserController } from '@/src/application/controllers/user/add-user-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeAddUser } from '../../usecases/user/db-add-user-factory'
import { makeAddUserValidation } from '../../validations/user/add-user-validation-factory'

export const makeAddUserController = (): IController => {
  const addUserController = new AddUserController(makeAddUserValidation(),makeAddUser())
  return makeLogControllerDecorator(addUserController)
}
