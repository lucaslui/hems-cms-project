import { UserModel } from '../../../../../entities/user'

export interface LoadUserByHemsRepository {
  loadByHems (hemsId: string): Promise<UserModel>
}
