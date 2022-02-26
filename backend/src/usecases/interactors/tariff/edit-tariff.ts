import { EditTariffRepository } from '../../boundaries/output/repositories/tariff/edit-tariff-repository'
import { TariffModel } from '@/src/entities/tariff'
import { IEditTariff } from '../../boundaries/input/tariff/edit-tariff'

export class EditTariff implements IEditTariff {
  constructor (
    private readonly editTariffRepository: EditTariffRepository
  ) {}

  async edit (tariff: TariffModel): Promise<boolean> {
    await this.editTariffRepository.edit(tariff)
    return true
  }
}
