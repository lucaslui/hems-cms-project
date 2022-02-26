import { UserModel } from '../../../entities/user'
import { ICheckAccessToken } from '../../boundaries/input/auth/check-access-token'
import { IDecrypter } from '../../boundaries/output/criptography/decrypter'
import { LoadUserByTokenRepository } from '../../boundaries/output/repositories/auth/load-user-by-token-repository'

export class CheckAccessToken implements ICheckAccessToken {
  constructor (
    private readonly decrypter: IDecrypter,
    private readonly loadAccountByTokenRepository: LoadUserByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<UserModel> {
    const decodedToken = await this.decrypter.decrypt(accessToken)
    if (decodedToken) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
