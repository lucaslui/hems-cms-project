import { IController } from '@/src/application/protocols'
import { AddDeviceController } from '@/src/application/controllers/device/add-device-controller'
import { makeAddHemsDeviceValidation } from '../../validations/device/add-device-validation-factory'
import { makeAddHemsDevice } from '../../usecases/devices/add-device-factory'

export const makeAddHemsDeviceController = (): IController => {
  return new AddDeviceController(makeAddHemsDeviceValidation(), makeAddHemsDevice())
}
