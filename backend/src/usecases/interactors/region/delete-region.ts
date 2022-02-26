import { IDeleteRegion } from '@/src/usecases/boundaries/input/region/delete-region'
import { LoadRegionByIdRepository } from '../../boundaries/output/repositories/region/load-region-by-id-repository'
import { DeleteRegionRepository } from '../../boundaries/output/repositories/region/delete-region-repository'

export class DbDeleteRegion implements IDeleteRegion {
  constructor (
    private readonly DeleteRegionRepository: DeleteRegionRepository,
    private readonly loadRegionByIdRepository: LoadRegionByIdRepository
  ) { }

  async delete (regionId: string): Promise<boolean> {
    const region = await this.loadRegionByIdRepository.loadById(regionId)
    if (region) {
      await this.DeleteRegionRepository.delete(regionId)
      return true
    }
    return false
  }
}
