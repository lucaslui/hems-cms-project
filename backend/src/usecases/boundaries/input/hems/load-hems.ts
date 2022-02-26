import { HemsModel } from '../../../../entities/hems'

export type LoadHemsQueryModel = {
  regionId?: string
  page?: number
}

export interface ILoadHems {
  load (query: LoadHemsQueryModel): Promise<HemsModel[]>
}
