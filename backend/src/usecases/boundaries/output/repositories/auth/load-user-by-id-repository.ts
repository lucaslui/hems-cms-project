import { UserModel } from '../../../../../entities/user'

export interface LoadUserByIdRepository {
  loadById (userId: string): Promise<UserModel>
}
