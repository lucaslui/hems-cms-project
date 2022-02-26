import { ValueDataModel } from '../../../../../entities/data'
import { LoadDataQueryModel } from '../../../input/data/load-data-by-query'

export interface LoadPointsDataRepository {
  loadPointsData (query: LoadDataQueryModel, hemsId: string): Promise<ValueDataModel[]>
}
