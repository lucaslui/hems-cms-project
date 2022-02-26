import { IValidation } from '@/src/application/protocols'
import { IAuthenticate, AuthenticationRequestModel, AuthenticationResponseModel } from '@/src/usecases/boundaries/input/auth/authenticate'
import { ICreateAccount, AddAccountRequestModel, AddAccountResponseModel } from '@/src/usecases/boundaries/input/auth/create-account'
import { mockAddAccountResponse, mockAuthenticationResponse } from './data-mocks'

export class AuthenticationSpy implements IAuthenticate {
  async auth (authentication: AuthenticationRequestModel): Promise<AuthenticationResponseModel> {
    return Promise.resolve(mockAuthenticationResponse())
  }
}

export class AddAccountSpy implements ICreateAccount {
  async add (account: AddAccountRequestModel): Promise<AddAccountResponseModel> {
    const fakeAccount = mockAddAccountResponse()
    return new Promise(resolve => resolve(fakeAccount))
  }
}

export class ValidationSpy implements IValidation {
  validate (input: any): Error {
    return null
  }
}
