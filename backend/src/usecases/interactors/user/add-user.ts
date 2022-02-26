import { IAddUser, AddUserModel } from '@/src/usecases/boundaries/input/user/add-user'
import { IHasher } from '../../boundaries/output/criptography/hasher'
import { LoadUserByEmailRepository } from '../../boundaries/output/repositories/auth/load-user-by-email-repository'
import { AddUserRepository } from '../../boundaries/output/repositories/user/add-user-repository'

export class AddUser implements IAddUser {
  constructor (
    private readonly addUserRepository: AddUserRepository,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hasher: IHasher
  ) { }

  async add (user: AddUserModel): Promise<boolean> {
    const account = await this.loadUserByEmailRepository.loadByEmail(user.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(user.password)
      await this.addUserRepository.addWithRole(Object.assign({}, user, { password: hashedPassword }))
      return true
    }
    return false
  }
}
