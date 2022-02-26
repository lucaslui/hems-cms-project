import { DeviceModel } from '../../../../entities/device'

export interface ILoadDevicesAdmin {
  loadDevicesAdmin (hemsId: string, page: number): Promise<DeviceModel[]>
}
