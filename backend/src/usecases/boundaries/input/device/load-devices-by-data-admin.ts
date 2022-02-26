import { DeviceModel } from '../../../../entities/device'

export interface ILoadDevicesByDataAdmin {
  load (hemsId: string, page: number): Promise<DeviceModel[]>
}
