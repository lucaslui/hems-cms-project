import { IDeleteUser } from '@/src/usecases/boundaries/input/user/delete-user'
import { DeleteUserRepository } from '../../boundaries/output/repositories/user/delete-user-repository'
import { LoadUserByIdRepository } from '../../boundaries/output/repositories/auth/load-user-by-id-repository'

export class DeleteUser implements IDeleteUser {
  constructor (
    private readonly deleteUserRepository: DeleteUserRepository,
    private readonly loadUserByIdRepository: LoadUserByIdRepository
  ) { }

  async delete (userId: string): Promise<boolean> {
    const user = await this.loadUserByIdRepository.loadById(userId)
    if (user) {
      await this.deleteUserRepository.delete(userId)
      return true
    }
    return false
  }
}
