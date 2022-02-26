import { LoadTariffController } from '@/src/application/controllers/tariff/load-tariff-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeLoadTariff } from '../../usecases/tariff/db-load-tariff-factory'

export const makeLoadTariffController = (): IController => {
  const loadTariffController = new LoadTariffController(makeLoadTariff())
  return makeLogControllerDecorator(loadTariffController)
}
