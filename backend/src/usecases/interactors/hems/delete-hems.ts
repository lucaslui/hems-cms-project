import { IDeleteHems } from '@/src/usecases/boundaries/input/hems/delete-hems'
import { LoadHemsByIdRepository } from '../../boundaries/output/repositories/hems/load-hems-by-id-repository'
import { DeleteHemsRepository } from '../../boundaries/output/repositories/hems/delete-hems-repository'

export class DeleteHems implements IDeleteHems {
  constructor (
    private readonly deleteHemsRepository: DeleteHemsRepository,
    private readonly loadHemsByIdRepository: LoadHemsByIdRepository
  ) { }

  async delete (hemsId: string): Promise<boolean> {
    const hems = await this.loadHemsByIdRepository.loadById(hemsId)
    if (hems) {
      await this.deleteHemsRepository.delete(hemsId)
      return true
    }
    return false
  }
}
