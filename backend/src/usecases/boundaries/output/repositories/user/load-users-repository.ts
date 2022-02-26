import { LoadUsersQueryModel } from '@/src/usecases/boundaries/input/user/load-users'
import { UserModel } from '../../../../../entities/user'

export interface LoadUsersRepository {
  load (query: LoadUsersQueryModel): Promise<UserModel[]>
}
