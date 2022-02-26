import { TariffModel } from '@/src/entities/tariff'

export interface EditTariffRepository {
  edit (tariff: TariffModel): Promise<void>
}
