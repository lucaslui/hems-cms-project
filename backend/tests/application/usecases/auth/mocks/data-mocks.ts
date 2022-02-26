import { UserModel } from '@/src/entities/user'
import { AuthenticationRequestModel } from '@/src/usecases/boundaries/input/auth/authenticate'
import { AddAccountRequestModel } from '@/src/usecases/boundaries/input/auth/create-account'

export const mockAccount = (): UserModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password',
  createdAt: new Date('2021-01-27T13:23:15.450Z')
})

export const mockAuthenticationRequest = (): AuthenticationRequestModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAddAccountRequest = (): AddAccountRequestModel => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})
