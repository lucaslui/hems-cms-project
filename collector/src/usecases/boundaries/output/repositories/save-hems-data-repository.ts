import { HemsPayloadModel } from '@/src/entities/hems-data';

export interface IHemsSaveDataRepository {
  save (payload: HemsPayloadModel): Promise<void>
}
