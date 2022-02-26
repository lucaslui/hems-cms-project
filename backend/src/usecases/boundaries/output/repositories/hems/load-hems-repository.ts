import { HemsModel } from '@/src/entities/hems'
import { LoadHemsQueryModel } from '@/src/usecases/boundaries/input/hems/load-hems'

export interface LoadHemsRepository {
  load (query: LoadHemsQueryModel): Promise<HemsModel[]>
}
