import { LoadUserByIdRepository } from '../../boundaries/output/repositories/auth/load-user-by-id-repository'
import { ILoadUserHems, UserHemsModel } from '../../boundaries/input/user/load-user-hems'

export class LoadUserHems implements ILoadUserHems {
  constructor (
    private readonly loadUserByIdRepository: LoadUserByIdRepository
  ) {}

  async loadHems (userId: string): Promise<UserHemsModel> {
    const user = await this.loadUserByIdRepository.loadById(userId)
    if (user) {
      return { hemsId: user.hemsId }
    }
    return null
  }
}
