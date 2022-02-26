import { ProfileModel } from '../../../../entities/user'

export interface IEditUserProfile {
  editProfile (profile: ProfileModel, userId: string): Promise<boolean>
}
