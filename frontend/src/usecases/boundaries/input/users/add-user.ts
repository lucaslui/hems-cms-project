import { UserModel } from '@/entities/user';

export type AddUserParams = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
    role: string
  }
  
  export interface IAddUser {
    add: (params: AddUserParams) => Promise<UserModel>
  }