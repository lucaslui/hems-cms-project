import { MeasureDataModel, ValueDataModel } from '../../../entities/data'
import { ILoadData, LoadDataQueryModel } from '../../boundaries/input/data/load-data-by-query'
import { LoadUserByIdRepository } from '../../boundaries/output/repositories/auth/load-user-by-id-repository'
import { LoadMeasuresDataRepository } from '../../boundaries/output/repositories/data/load-measures-data-repository'
import { LoadPointsDataRepository } from '../../boundaries/output/repositories/data/load-points-data-repository copy'

export class LoadData implements ILoadData {
  constructor (
    private readonly loadAccountByIdRepository: LoadUserByIdRepository,
    private readonly loadMeasuresDataRepository: LoadMeasuresDataRepository,
    private readonly loadPointsDateRepository: LoadPointsDataRepository
  ) {}

  async loadDeviceData (query: LoadDataQueryModel, userId: string): Promise<Array<MeasureDataModel | ValueDataModel>> {
    const account = await this.loadAccountByIdRepository.loadById(userId)
    if (account?.hemsId || account?.role === 'admin') {
      const hemsId = query.hemsId || account?.hemsId

      const data = query.measureId
        ? await this.loadPointsDateRepository.loadPointsData(query, hemsId)
        : await this.loadMeasuresDataRepository.loadMeasuresData(query, hemsId)
      return data
    }
    return null
  }
}
