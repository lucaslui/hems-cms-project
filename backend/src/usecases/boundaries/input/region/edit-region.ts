import { AddRegionModel } from './add-region'

export interface IEditRegion {
  edit (regionId: string, region: AddRegionModel): Promise<boolean>
}
