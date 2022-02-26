import { IEditTariff } from '@/src/usecases/boundaries/input/tariff/edit-tariff'
import { EditTariff } from '@/src/usecases/interactors/tariff/edit-tariff'
import { TariffMongoRepository } from '@/src/infrastructure/repositories/mongodb/tariff-mongo-repository'

export const makeEditTariff = (): IEditTariff => {
  const tariffMongoRepository = new TariffMongoRepository()
  return new EditTariff(tariffMongoRepository)
}
