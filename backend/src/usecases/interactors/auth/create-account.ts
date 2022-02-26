import { ICreateAccount, AddAccountRequestModel } from '@/src/usecases/boundaries/input/auth/create-account'
import { AuthenticationResponseModel } from '../../boundaries/input/auth/authenticate'
import { IEncrypter } from '../../boundaries/output/criptography/encrypter'
import { IHasher } from '../../boundaries/output/criptography/hasher'
import { AddAccountRepository } from '../../boundaries/output/repositories/auth/add-account-repository'
import { EditUserAccessTokenRepository } from '../../boundaries/output/repositories/auth/edit-user-access-token-repository'
import { LoadUserByEmailRepository } from '../../boundaries/output/repositories/auth/load-user-by-email-repository'

export class CreateAccount implements ICreateAccount {
  constructor (
    private readonly hasher: IHasher,
    private readonly encrypter: IEncrypter,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly editUserAccessTokenRepository: EditUserAccessTokenRepository
  ) { }

  async add (accountData: AddAccountRequestModel): Promise<AuthenticationResponseModel> {
    const account = await this.loadUserByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const account = await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
      const accessToken = await this.encrypter.encrypt(account.id)
      await this.editUserAccessTokenRepository.updateAccessToken(account.id, accessToken)
      const response = {
        name: account.name,
        email: account.email,
        role: account.role,
        accessToken
      }
      return response
    }
    return null
  }
}
