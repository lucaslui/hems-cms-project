import { AddDevice } from '@/src/usecases/interactors/device/add-device'
import { IAddDevice } from '@/src/usecases/boundaries/input/device/add-device'
import { DeviceMongoRepository } from '@/src/infrastructure/repositories/mongodb/device-mongo-repository'
import { UserMongoRepository } from '@/src/infrastructure/repositories/mongodb/user-mongo-repository'

export const makeAddHemsDevice = (): IAddDevice => {
  const deviceMongoRepository = new DeviceMongoRepository()
  const userMongoRepository = new UserMongoRepository()
  return new AddDevice(deviceMongoRepository, userMongoRepository, deviceMongoRepository)
}
