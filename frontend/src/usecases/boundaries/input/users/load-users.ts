import { UserModel } from '@/entities/user';

export type LoadUsersParams = {
    page: number
  }
  
  export interface ILoadUsers {
    load: (params: LoadUsersParams) => Promise<UserModel[]>
  }