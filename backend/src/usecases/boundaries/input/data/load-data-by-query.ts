import { MeasureDataModel, ValueDataModel } from '../../../../entities/data'

export type LoadDataQueryModel = {
  deviceId: string
  hemsId: string
  measureId?: string
  granularity?: string
  startTime?: string
  endTime?: string
}

export interface ILoadData {
  loadDeviceData(query: LoadDataQueryModel, userId: string): Promise<Array<MeasureDataModel | ValueDataModel>>
}
