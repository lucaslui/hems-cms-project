import { IController } from '@/src/application/protocols'
import { DeleteHemsDeviceController } from '@/src/application/controllers/device/delete-device-controller'
import { makeDeleteHemsDevice } from '../../usecases/devices/delete-device-factory'

export const makeDeleteHemsDeviceController = (): IController => {
  return new DeleteHemsDeviceController(makeDeleteHemsDevice())
}
