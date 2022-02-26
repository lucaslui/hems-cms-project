import { RegionModel } from '@/src/entities/region'
import { AddRegionModel } from '@/src/usecases/boundaries/input/region/add-region'

export interface AddRegionRepository {
  add (region: AddRegionModel): Promise<RegionModel>
}
