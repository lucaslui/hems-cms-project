import { RegionModel } from '@/src/entities/region'
import { LoadHemsQueryModel } from '@/src/usecases/boundaries/input/hems/load-hems'
import { ILoadRegions } from '@/src/usecases/boundaries/input/region/load-regions'
import { LoadRegionsRepository } from '../../boundaries/output/repositories/region/load-region-repository'

export class DbLoadRegions implements ILoadRegions {
  constructor (
    private readonly loadHemsRepository: LoadRegionsRepository
  ) {}

  async load (query: LoadHemsQueryModel): Promise<RegionModel[]> {
    const regions = await this.loadHemsRepository.load(query)
    return regions
  }
}
