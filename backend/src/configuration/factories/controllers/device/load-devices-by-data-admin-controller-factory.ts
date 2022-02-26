import { IController } from '@/src/application/protocols'
import { makeLoadDevicesByDataAdmin } from '../../usecases/devices/load-devices-by-data-admin-factory'
import { LoadDevicesByDataAdminController } from '@/src/application/controllers/device/load-devices-by-data-admin-controller'

export const makeLoadDevicesByDataAdminController = (): IController => {
  return new LoadDevicesByDataAdminController(makeLoadDevicesByDataAdmin())
}
