import { LoadDevices } from '@/src/usecases/interactors/device/load-devices'
import { ILoadDevices } from '@/src/usecases/boundaries/input/device/load-devices'
import { DeviceMongoRepository } from '@/src/infrastructure/repositories/mongodb/device-mongo-repository'
import { UserMongoRepository } from '@/src/infrastructure/repositories/mongodb/user-mongo-repository'

export const makeLoadHemsDevices = (): ILoadDevices => {
  const deviceMongoRepository = new DeviceMongoRepository()
  const userMongoRepository = new UserMongoRepository()
  return new LoadDevices(deviceMongoRepository, userMongoRepository)
}
