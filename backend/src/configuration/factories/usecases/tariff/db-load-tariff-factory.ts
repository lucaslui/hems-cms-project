import { ILoadTariff } from '@/src/usecases/boundaries/input/tariff/load-tariff'
import { LoadTariff } from '@/src/usecases/interactors/tariff/load-tariff'
import { TariffMongoRepository } from '@/src/infrastructure/repositories/mongodb/tariff-mongo-repository'

export const makeLoadTariff = (): ILoadTariff => {
  const tariffMongoRepository = new TariffMongoRepository()
  return new LoadTariff(tariffMongoRepository)
}
