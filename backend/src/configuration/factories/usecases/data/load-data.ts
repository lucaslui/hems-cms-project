import { UserMongoRepository } from '../../../../infrastructure/repositories/mongodb/user-mongo-repository'
import { ILoadData } from '../../../../usecases/boundaries/input/data/load-data-by-query'
import { LoadData } from '../../../../usecases/interactors/data/load-data'
// import { DataMongoRepository } from '../../../../infrastructure/repositories/mongodb/data-mongo-repository'
import { DataInfluxRepository } from '@/src/infrastructure/repositories/influxdb/data-influx-repository'

export const makeLoadData = (): ILoadData => {
  const userMongoRepository = new UserMongoRepository()
  // const dataMongoRepository = new DataMongoRepository()
  const dataInfluxRepository = new DataInfluxRepository()
  return new LoadData(userMongoRepository, dataInfluxRepository, dataInfluxRepository)
}
