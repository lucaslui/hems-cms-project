import { IController } from '@/src/application/protocols'
import { LoadDevicesController } from '@/src/application/controllers/device/load-devices-controller'
import { makeLoadHemsDevices } from '../../usecases/devices/load-devices-factory'

export const makeLoadHemsDevicesController = (): IController => {
  return new LoadDevicesController(makeLoadHemsDevices())
}
