import { HemsModel } from '@/src/entities/hems'

export interface LoadHemsByIdRepository {
  loadById (hemsId: string): Promise<HemsModel>
}
