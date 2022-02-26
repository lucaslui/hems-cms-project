import { EditUserModel } from '../../../input/user/edit-user'

export interface EditUserRepository {
  edit (user: EditUserModel): Promise<void>
}
