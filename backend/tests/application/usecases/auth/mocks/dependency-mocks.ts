import { UserModel } from '@/src/entities/user'
import { AddAccountRequestModel } from '@/src/usecases/boundaries/input/auth/create-account'
import { IEncrypter } from '@/src/usecases/boundaries/output/criptography/encrypter'
import { IHashComparer } from '@/src/usecases/boundaries/output/criptography/hash-comparer'
import { IHasher } from '@/src/usecases/boundaries/output/criptography/hasher'
import { AddAccountRepository } from '@/src/usecases/boundaries/output/repositories/auth/add-account-repository'
import { mockAccount } from './data-mocks'
import { EditUserAccessTokenRepository } from '@/src/usecases/boundaries/output/repositories/auth/edit-user-access-token-repository'

export class EncrypterSpy implements IEncrypter {
  async encrypt (value: string): Promise<string> {
    return Promise.resolve('any_token')
  }
}

export class HasherSpy implements IHasher {
  async hash (value: string): Promise<string> {
    return new Promise(resolve => resolve('hashed_password'))
  }
}

export class HashComparerSpy implements IHashComparer {
  async compare (value: string, hash: string): Promise<boolean> {
    return Promise.resolve(true)
  }
}

export class AddAccountRepositorySpy implements AddAccountRepository {
  async add (accountData: AddAccountRequestModel): Promise<UserModel> {
    return new Promise(resolve => resolve(mockAccount()))
  }
}

export class UpdateAccessTokenRepositorySpy implements EditUserAccessTokenRepository {
  async updateAccessToken (value: string, token: string): Promise<void> {
    return Promise.resolve()
  }
}
