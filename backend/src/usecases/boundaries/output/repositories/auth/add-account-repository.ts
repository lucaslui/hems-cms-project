
import { UserModel } from '../../../../../entities/user'
import { AddAccountRequestModel } from '../../../input/auth/create-account'

export interface AddAccountRepository {
  add (accountData: AddAccountRequestModel): Promise<UserModel>
}
