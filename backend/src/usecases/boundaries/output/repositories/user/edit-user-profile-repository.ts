import { ProfileModel } from '@/src/entities/user'

export interface EditUserProfileRepository {
  editProfile (profile: ProfileModel, userId: string): Promise<void>
}
