import { HemsModel } from '../../../../entities/hems'

export interface IAddHems {
  add (hems: HemsModel): Promise<boolean>
}
