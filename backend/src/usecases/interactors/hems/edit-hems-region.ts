import { IEditHemsRegion } from '@/src/usecases/boundaries/input/hems/edit-hems-region'
import { EditHemsRegionRepository } from '../../boundaries/output/repositories/hems/edit-hems-region-repository'
import { LoadHemsByIdRepository } from '../../boundaries/output/repositories/hems/load-hems-by-id-repository'

export class EditHemsRegion implements IEditHemsRegion {
  constructor (
    private readonly editHemsRegionRepository: EditHemsRegionRepository,
    private readonly loadHemsByIdRepository: LoadHemsByIdRepository
  ) {}

  async editRegion (hemsId: string, regionId: string): Promise<boolean> {
    const hems = await this.loadHemsByIdRepository.loadById(hemsId)
    if (hems) {
      await this.editHemsRegionRepository.editRegion(hemsId, regionId)
      return true
    }
    return false
  }
}
