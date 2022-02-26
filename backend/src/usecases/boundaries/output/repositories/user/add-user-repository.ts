
import { AddUserModel } from '@/src/usecases/boundaries/input/user/add-user'

export interface AddUserRepository {
  addWithRole (user: AddUserModel): Promise<void>
}
