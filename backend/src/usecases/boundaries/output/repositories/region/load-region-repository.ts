import { RegionModel } from '@/src/entities/region'
import { LoadRegionsQueryModel } from '@/src/usecases/boundaries/input/region/load-regions'

export interface LoadRegionsRepository {
  load (query: LoadRegionsQueryModel): Promise<RegionModel[]>
}
