import { LoadHemsController } from '@/src/application/controllers/hems/load-hems-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeLoadHems } from '../../usecases/hems/load-hems-factory'

export const makeLoadHemsController = (): IController => {
  const loadHemsController = new LoadHemsController(makeLoadHems())
  return makeLogControllerDecorator(loadHemsController)
}
