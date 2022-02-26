import { ProfileModel } from '@/src/entities/user'
import { ILoadUserProfile } from '@/src/usecases/boundaries/input/user/load-user-profile'
import { LoadUserByIdRepository } from '../../boundaries/output/repositories/auth/load-user-by-id-repository'

export class LoadUserProfile implements ILoadUserProfile {
  constructor (
    private readonly loadUserByIdRepository: LoadUserByIdRepository
  ) {}

  async loadProfile (userId: string): Promise<ProfileModel> {
    const user = await this.loadUserByIdRepository.loadById(userId)
    if (user) {
      return user.profile || {
        cpf: '',
        rg: '',
        birthdate: null,
        cep: '',
        street: '',
        number: '',
        district: '',
        state: '',
        city: '',
        complement: '',
        phone: ''
      }
    }
    return null
  }
}
