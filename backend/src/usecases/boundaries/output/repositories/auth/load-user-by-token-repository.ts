import { UserModel } from '../../../../../entities/user'

export interface LoadUserByTokenRepository {
  loadByToken (token: string, role?: string): Promise<UserModel>
}
