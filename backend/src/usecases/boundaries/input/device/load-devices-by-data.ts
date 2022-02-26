import { DeviceModel } from '../../../../entities/device'

export interface ILoadDevicesByData {
  load (userId: string, page: number): Promise<DeviceModel[]>
}
