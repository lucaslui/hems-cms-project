import { HemsModel } from '@/src/entities/hems'

export interface LoadRegionByIdRepository {
  loadById (regionId: string): Promise<HemsModel>
}
