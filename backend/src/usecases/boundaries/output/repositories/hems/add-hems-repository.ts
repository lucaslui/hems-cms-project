import { HemsModel } from '@/src/entities/hems'

export interface AddHemsRepository {
  add (hems: HemsModel): Promise<void>
}
