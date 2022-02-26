import { IController } from '@/src/application/protocols'
import { LoadDevicesAdminController } from '@/src/application/controllers/device/load-devices-admin-controller'
import { makeLoadDevicesAdmin } from '../../usecases/devices/load-devices-admin-factory'

export const makeLoadDevicesAdminController = (): IController => {
  return new LoadDevicesAdminController(makeLoadDevicesAdmin())
}
