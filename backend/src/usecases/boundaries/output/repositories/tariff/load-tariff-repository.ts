import { TariffModel } from '@/src/entities/tariff'
import { LoadTariffQueryModel } from '../../../input/tariff/load-tariff'

export interface LoadTariffRepository {
  load (query: LoadTariffQueryModel): Promise<TariffModel>
}
