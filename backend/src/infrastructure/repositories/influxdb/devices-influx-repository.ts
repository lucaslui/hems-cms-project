import { LoadHemsAllDevicesRepository } from '@/src/usecases/boundaries/output/repositories/device/load-devices-by-data-repository'
import { DeviceModel } from '@/src/entities/device'
import { InfluxHelper } from './influx-helper'

export class DevicesInfluxRepository implements LoadHemsAllDevicesRepository {
  async loadByData (hemsId: string, page: number): Promise<DeviceModel[]> {
    const fluxQuery =
        `from(bucket: "hems-bucket")
        |> range(start: -365d, stop: now())
        |> filter(fn: (r) => r._measurement == "energy")
        |> filter(fn: (r) => r.hemsId == "${hemsId}")
        |> group(columns: ["deviceId"])
        |> distinct(column: "deviceId")
        |> keep(columns: ["_value"])`
    const devices = await InfluxHelper.queryApi.collectRows(fluxQuery)
    return devices.map(x => ({ id: x._value }))
  }
}
