import { LoadUserByIdRepository } from '../../boundaries/output/repositories/auth/load-user-by-id-repository'
import { EditUserModel, IEditUser } from '../../boundaries/input/user/edit-user'
import { EditUserRepository } from '../../boundaries/output/repositories/user/edit-user-repository'

export class EditUser implements IEditUser {
  constructor (
    private readonly editUserRepository: EditUserRepository,
    private readonly loadUserByIdRepository: LoadUserByIdRepository
  ) {}

  async edit (user: EditUserModel): Promise<boolean> {
    const userFound = await this.loadUserByIdRepository.loadById(user.id)
    if (userFound) {
      await this.editUserRepository.edit(user)
      return true
    }
    return false
  }
}
