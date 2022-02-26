import { DeleteDevice } from '@/src/usecases/interactors/device/delete-device'
import { IDeleteDevice } from '@/src/usecases/boundaries/input/device/delete-device'
import { DeviceMongoRepository } from '@/src/infrastructure/repositories/mongodb/device-mongo-repository'
import { UserMongoRepository } from '@/src/infrastructure/repositories/mongodb/user-mongo-repository'

export const makeDeleteHemsDevice = (): IDeleteDevice => {
  const deviceMongoRepository = new DeviceMongoRepository()
  const userMongoRepository = new UserMongoRepository()
  return new DeleteDevice(deviceMongoRepository, userMongoRepository, deviceMongoRepository)
}
