import { UserModel } from '../../../../entities/user'

export type LoadUsersQueryModel = {
  page?: number
}

export interface ILoadUsers {
  load (query: LoadUsersQueryModel): Promise<UserModel[]>
}
