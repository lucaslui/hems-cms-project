import { TariffModel } from '@/src/entities/tariff'

export type LoadTariffQueryModel = {
  page?: number
}

export interface ILoadTariff {
  load (query: LoadTariffQueryModel): Promise<TariffModel>
}
