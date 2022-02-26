import { RegionModel } from '@/src/entities/region'
import { IAddRegion, AddRegionModel } from '@/src/usecases/boundaries/input/region/add-region'
import { AddRegionRepository } from '../../boundaries/output/repositories/region/add-region-repository'

export class DbAddRegion implements IAddRegion {
  constructor (
    private readonly addRegionRepository: AddRegionRepository
  ) { }

  async add (region: AddRegionModel): Promise<RegionModel> {
    const regionAdded = await this.addRegionRepository.add(region)
    return regionAdded
  }
}
