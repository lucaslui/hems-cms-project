import { ProfileModel } from '../../../../entities/user'

export interface ILoadUserProfile {
  loadProfile (userId: string): Promise<ProfileModel>
}
