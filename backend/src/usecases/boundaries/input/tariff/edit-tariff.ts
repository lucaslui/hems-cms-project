import { TariffModel } from '@/src/entities/tariff'

export interface IEditTariff {
  edit (tariff: TariffModel): Promise<boolean>
}
