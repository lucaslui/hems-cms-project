import { RegionModel } from '../../../../entities/region'

export type LoadRegionsQueryModel = {
  page?: number
}

export interface ILoadRegions {
  load (query: LoadRegionsQueryModel): Promise<RegionModel[]>
}
