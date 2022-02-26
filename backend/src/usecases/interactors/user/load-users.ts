import { UserModel } from '@/src/entities/user'
import { ILoadUsers, LoadUsersQueryModel } from '@/src/usecases/boundaries/input/user/load-users'
import { LoadUsersRepository } from '../../boundaries/output/repositories/user/load-users-repository'

export class LoadUsers implements ILoadUsers {
  constructor (
    private readonly loadUsersRepository: LoadUsersRepository
  ) {}

  async load (query: LoadUsersQueryModel): Promise<UserModel[]> {
    const users = await this.loadUsersRepository.load(query)
    return users
  }
}
