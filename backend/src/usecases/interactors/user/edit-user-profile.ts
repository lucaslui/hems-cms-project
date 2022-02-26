import { ProfileModel } from '@/src/entities/user'
import { IEditUserProfile } from '@/src/usecases/boundaries/input/user/edit-user-profile'
import { LoadUserByIdRepository } from '../../boundaries/output/repositories/auth/load-user-by-id-repository'
import { EditUserProfileRepository } from '../../boundaries/output/repositories/user/edit-user-profile-repository'

export class EditUserProfile implements IEditUserProfile {
  constructor (
    private readonly editUserProfileRepository: EditUserProfileRepository,
    private readonly loadUserByIdRepository: LoadUserByIdRepository
  ) {}

  async editProfile (profile: ProfileModel, userId: string): Promise<boolean> {
    const user = await this.loadUserByIdRepository.loadById(userId)
    if (user) {
      await this.editUserProfileRepository.editProfile(profile, userId)
      return true
    }
    return false
  }
}
