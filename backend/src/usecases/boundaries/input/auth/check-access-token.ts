import { UserModel } from '../../../../entities/user'

export interface ICheckAccessToken {
  load (accessToken: string, role?: string): Promise<UserModel>
}
