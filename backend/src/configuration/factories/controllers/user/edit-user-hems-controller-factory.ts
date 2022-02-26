import { EditUserHemsController } from '@/src/application/controllers/user/edit-user-hems-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeEditUserHems } from '../../usecases/user/db-edit-user-hems-factory'

export const makeEditUserHemsController = (): IController => {
  const editUserHemsController = new EditUserHemsController(makeEditUserHems())
  return makeLogControllerDecorator(editUserHemsController)
}
