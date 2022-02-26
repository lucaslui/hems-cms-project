import { IController } from '@/src/application/protocols'
import { LoadDevicesByDataController } from '@/src/application/controllers/device/load-devices-by-data-controller'
import { makeLoadDevicesByData } from '../../usecases/devices/load-devices-by-data-factory'

export const makeLoadDevicesByDataController = (): IController => {
  return new LoadDevicesByDataController(makeLoadDevicesByData())
}
