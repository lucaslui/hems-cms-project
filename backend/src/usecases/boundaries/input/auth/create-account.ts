import { AuthenticationResponseModel } from './authenticate'

export type AddAccountRequestModel = {
  name: string
  email: string
  password: string
}

export interface ICreateAccount {
  add (account: AddAccountRequestModel): Promise<AuthenticationResponseModel>
}
