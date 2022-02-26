import { IHttpRequest } from '@/src/application/protocols'
import { AddAccountResponseModel } from '@/src/usecases/boundaries/input/auth/create-account'

export const mockLoginRequest = (): IHttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

export const mockSignUpRequest = (): IHttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

export const mockAddAccountResponse = (): AddAccountResponseModel => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  accessToken: 'any_token'
})

export const mockAuthenticationResponse = (): AddAccountResponseModel => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  accessToken: 'any_token'
})
