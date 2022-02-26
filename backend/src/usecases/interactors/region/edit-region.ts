import { AddRegionModel } from '@/src/usecases/boundaries/input/region/add-region'
import { IEditRegion } from '@/src/usecases/boundaries/input/region/edit-region'
import { EditRegionRepository } from '../../boundaries/output/repositories/region/edit-region-repository'
import { LoadRegionByIdRepository } from '../../boundaries/output/repositories/region/load-region-by-id-repository'

export class DbEditRegion implements IEditRegion {
  constructor (
    private readonly editRegionRepository: EditRegionRepository,
    private readonly loadRegionByIdRepository: LoadRegionByIdRepository
  ) {}

  async edit (regionId: string, region: AddRegionModel): Promise<boolean> {
    const regionAlreadyExist = await this.loadRegionByIdRepository.loadById(regionId)
    if (regionAlreadyExist) {
      await this.editRegionRepository.edit(regionId, region)
      return true
    }
    return false
  }
}
