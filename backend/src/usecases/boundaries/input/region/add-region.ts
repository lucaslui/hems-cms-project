import { RegionModel } from '../../../../entities/region'

export type AddRegionModel = {
  name: string
  description: string
}

export interface IAddRegion {
  add (region: AddRegionModel): Promise<RegionModel>
}
