import { IController } from '@/src/application/protocols'
import { HemsSaveDataController } from '@/src/application/controllers/hems-save-data-controller'
import { HemsSaveDataUsecase } from '@/src/usecases/interactors/hems-save-data'
import { DataInfluxRepository } from '@/src/infrastructure/repositories/influxdb/data-influx-repository'

export const makeHemsSaveDataController = (): IController => {
  const dataInfluxRepository = new DataInfluxRepository()
  const hemsSaveDataUsecase = new HemsSaveDataUsecase(dataInfluxRepository)
  const hemsSaveDataController = new HemsSaveDataController(hemsSaveDataUsecase)
  return hemsSaveDataController
}
