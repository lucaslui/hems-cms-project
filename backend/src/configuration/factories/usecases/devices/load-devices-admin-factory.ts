import { DeviceMongoRepository } from '@/src/infrastructure/repositories/mongodb/device-mongo-repository'
import { ILoadDevicesAdmin } from '@/src/usecases/boundaries/input/device/load-devices-admin'
import { LoadDevicesAdmin } from '@/src/usecases/interactors/device/load-devices-admin'

export const makeLoadDevicesAdmin = (): ILoadDevicesAdmin => {
  const deviceMongoRepository = new DeviceMongoRepository()
  return new LoadDevicesAdmin(deviceMongoRepository)
}
