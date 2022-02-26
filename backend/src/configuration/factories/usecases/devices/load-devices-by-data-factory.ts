import { ILoadDevicesByData } from '@/src/usecases/boundaries/input/device/load-devices-by-data'
import { LoadDeviceByData } from '@/src/usecases/interactors/device/load-devices-by-data'
import { DevicesInfluxRepository } from '@/src/infrastructure/repositories/influxdb/devices-influx-repository'
import { UserMongoRepository } from '@/src/infrastructure/repositories/mongodb/user-mongo-repository'

export const makeLoadDevicesByData = (): ILoadDevicesByData => {
  const deviceInfluxRepository = new DevicesInfluxRepository()
  const userMongoRepository = new UserMongoRepository()
  return new LoadDeviceByData(deviceInfluxRepository, userMongoRepository)
}
