import { EditDevice } from '@/src/usecases/interactors/device/edit-device'
import { IEditDevice } from '@/src/usecases/boundaries/input/device/edit-device'
import { DeviceMongoRepository } from '@/src/infrastructure/repositories/mongodb/device-mongo-repository'
import { UserMongoRepository } from '@/src/infrastructure/repositories/mongodb/user-mongo-repository'

export const makeEditHemsDeviceNickname = (): IEditDevice => {
  const deviceMongoRepository = new DeviceMongoRepository()
  const userMongoRepository = new UserMongoRepository()
  return new EditDevice(deviceMongoRepository, userMongoRepository, deviceMongoRepository)
}
