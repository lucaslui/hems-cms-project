import { DeleteHemsController } from '@/src/application/controllers/hems/delete-hems-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDeleteHems } from '../../usecases/hems/delete-hems-factory'

export const makeDeleteHemsController = (): IController => {
  const deleteHemsController = new DeleteHemsController(makeDeleteHems())
  return makeLogControllerDecorator(deleteHemsController)
}
