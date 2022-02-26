import { ILoadTariff, LoadTariffQueryModel } from '../../boundaries/input/tariff/load-tariff'
import { TariffModel } from '@/src/entities/tariff'
import { LoadTariffRepository } from '../../boundaries/output/repositories/tariff/load-tariff-repository'

export class LoadTariff implements ILoadTariff {
  constructor (
    private readonly loadTariffRepository: LoadTariffRepository
  ) {}

  async load (query: LoadTariffQueryModel): Promise<TariffModel> {
    const tariff = await this.loadTariffRepository.load(query)
    return tariff
  }
}
