import { DeviceModel } from '../../../../entities/device'

export interface ILoadDevices {
  load (userId: string, page: number): Promise<DeviceModel[]>
}
