import { AddRegionModel } from '@/src/usecases/boundaries/input/region/add-region'

export interface EditRegionRepository {
  edit (regionId: string, region: AddRegionModel): Promise<void>
}
