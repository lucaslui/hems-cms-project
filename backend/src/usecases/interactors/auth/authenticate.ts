import { AuthenticationResponseModel, IAuthenticate, AuthenticationRequestModel } from '../../boundaries/input/auth/authenticate'
import { IHashComparer } from '../../boundaries/output/criptography/hash-comparer'
import { IEncrypter } from '../../boundaries/output/criptography/encrypter'
import { LoadUserByEmailRepository } from '../../boundaries/output/repositories/auth/load-user-by-email-repository'
import { EditUserAccessTokenRepository } from '../../boundaries/output/repositories/auth/edit-user-access-token-repository'

export class Authenticate implements IAuthenticate {
  constructor (
    private readonly loadAccountByEmailRepository: LoadUserByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly updateAccessTokenRepository: EditUserAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationRequestModel): Promise<AuthenticationResponseModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isAuthorized = await this.hashComparer.compare(authentication.password, account.password)
      if (isAuthorized) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return {
          email: account.email,
          name: account.name,
          role: account.role,
          accessToken
        }
      }
    }
    return null
  }
}
