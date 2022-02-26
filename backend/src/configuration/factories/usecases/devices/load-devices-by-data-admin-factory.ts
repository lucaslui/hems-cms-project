import { ILoadDevicesByDataAdmin } from '@/src/usecases/boundaries/input/device/load-devices-by-data-admin'
import { LoadDeviceByDataAdmin } from '@/src/usecases/interactors/device/load-devices-by-data-admin'
import { DevicesInfluxRepository } from '@/src/infrastructure/repositories/influxdb/devices-influx-repository'

export const makeLoadDevicesByDataAdmin = (): ILoadDevicesByDataAdmin => {
  const deviceInfluxRepository = new DevicesInfluxRepository()
  return new LoadDeviceByDataAdmin(deviceInfluxRepository)
}
