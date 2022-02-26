import { IController } from '../../../../application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { LoadDeviceDataController } from '../../../../application/controllers/data/load-device-data-controller'
import { makeLoadDeviceDataValidation } from '../../validations/data/load-device-data-validation-factory'
import { makeLoadData } from '../../usecases/data/load-data'

export const makeLoadDeviceDataController = (): IController => {
  const loadDeviceDataController = new LoadDeviceDataController(makeLoadDeviceDataValidation(), makeLoadData())
  return makeLogControllerDecorator(loadDeviceDataController)
}
