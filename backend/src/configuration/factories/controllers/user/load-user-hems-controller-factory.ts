import { LoadUserHemsController } from '@/src/application/controllers/user/load-user-hems-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeLoadUserHems } from '../../usecases/user/db-load-user-hems-factory'

export const makeLoadUserHemsController = (): IController => {
  const loadUserHemsController = new LoadUserHemsController(makeLoadUserHems())
  return makeLogControllerDecorator(loadUserHemsController)
}
