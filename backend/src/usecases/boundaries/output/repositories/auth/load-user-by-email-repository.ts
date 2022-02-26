import { UserModel } from '../../../../../entities/user'

export interface LoadUserByEmailRepository {
  loadByEmail (email: string): Promise<UserModel>
}
