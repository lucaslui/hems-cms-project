import { AddHemsController } from '@/src/application/controllers/hems/add-hems-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeAddHems } from '../../usecases/hems/add-hems-factory'
import { makeAddHemsValidation } from '../../validations/hems/add-hems-validation-factory'

export const makeAddHemsController = (): IController => {
  const addHemsController = new AddHemsController(makeAddHemsValidation(),makeAddHems())
  return makeLogControllerDecorator(addHemsController)
}
