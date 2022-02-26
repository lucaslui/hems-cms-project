import { MeasureDataModel } from '../../../../../entities/data'
import { LoadDataQueryModel } from '../../../input/data/load-data-by-query'

export interface LoadMeasuresDataRepository {
  loadMeasuresData (query: LoadDataQueryModel, hemsId: string): Promise<MeasureDataModel[]>
}
