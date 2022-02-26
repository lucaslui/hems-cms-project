import { IEditUserHems } from '../../boundaries/input/user/edit-user-hems'
import { LoadHemsByIdRepository } from '../../boundaries/output/repositories/hems/load-hems-by-id-repository'
import { EditUserHemsRepository } from '../../boundaries/output/repositories/user/edit-user-hems-repository'
import { LoadUserByHemsRepository } from '../../boundaries/output/repositories/user/load-user-by-hems-id-repository'

export class EditUserHems implements IEditUserHems {
  constructor (
    private readonly editUserHemsRepository: EditUserHemsRepository,
    private readonly loadUserByHemsRepository: LoadUserByHemsRepository,
    private readonly loadHemsByIdRepository: LoadHemsByIdRepository
  ) {}

  async editHems (hemsId: string, userId: string): Promise<boolean> {
    const user = await this.loadUserByHemsRepository.loadByHems(hemsId)
    if (!user) {
      const hems = await this.loadHemsByIdRepository.loadById(hemsId)
      if (hems) {
        await this.editUserHemsRepository.editUserHems(hemsId, userId)
        return true
      }
    }
    return false
  }
}
