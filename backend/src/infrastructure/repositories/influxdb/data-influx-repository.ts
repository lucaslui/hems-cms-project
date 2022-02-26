import { LoadMeasuresDataRepository } from '@/src/usecases/boundaries/output/repositories/data/load-measures-data-repository'
import { LoadPointsDataRepository } from '@/src/usecases/boundaries/output/repositories/data/load-points-data-repository copy'
import { ValueDataModel, MeasureDataModel } from '@/src/entities/data'
import { LoadDataQueryModel } from '@/src/usecases/boundaries/input/data/load-data-by-query'
import { InfluxHelper } from './influx-helper'

export class DataInfluxRepository implements LoadPointsDataRepository, LoadMeasuresDataRepository {
  async loadMeasuresData (query: LoadDataQueryModel, hemsId: string): Promise<MeasureDataModel[]> {
    const startTime = query.startTime ? new Date(query.startTime).toISOString() : '-24h'
    const endTime = query.endTime ? new Date(query.endTime).toISOString() : 'now()'
    const fluxQuery =
      `from(bucket:"hems-bucket") 
      |> range(start: ${startTime}, stop: ${endTime}) 
      |> filter(fn: (r) => r._measurement == "energy")
      |> filter(fn: (r) => r.hemsId == "${hemsId}")
      |> filter(fn: (r) => r.deviceId == "${query.deviceId}")
      |> group(columns: ["_field"])
      |> aggregateWindow(every: ${query.granularity ? `${query.granularity.toString()}m` : '1m'}, fn: mean, createEmpty: false)
      |> yield(name: "mean")`
    const data = await InfluxHelper.queryApi.collectRows(fluxQuery)
    const groups = data.reduce((groups, field) => {
      const date = field._time
      if (!groups[date]) {
        groups[date] = {}
      }
      groups[date] = { ...groups[date], [field._field]: field._value }
      return groups
    }, {})
    const groupArrays = Object.keys(groups).map(date => {
      return {
        time: date,
        ...groups[date]
      }
    })
    return groupArrays
  }

  async loadPointsData (query: LoadDataQueryModel, hemsId: string): Promise<ValueDataModel[]> {
    const startTime = query.startTime ? new Date(query.startTime).toISOString() : '-24h'
    const endTime = query.endTime ? new Date(query.endTime).toISOString() : 'now()'
    const fluxQuery =
      `from(bucket:"hems-bucket") 
      |> range(start: ${startTime}, stop: ${endTime}) 
      |> filter(fn: (r) => r._measurement == "energy")
      |> filter(fn: (r) => r.hemsId == "${hemsId}")
      |> filter(fn: (r) => r.deviceId == "${query.deviceId}")
      |> filter(fn: (r) => r._field == "${query.measureId}")
      |> aggregateWindow(every: ${query.granularity ? `${query.granularity.toString()}m` : '1m'}, fn: mean, createEmpty: false)
      |> yield(name: "mean")`
    const data = await InfluxHelper.queryApi.collectRows(fluxQuery)
    return data.map(x => ({ time: x._time, value: x._value }))
  }
}
