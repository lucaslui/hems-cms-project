import { AddDeviceModel } from '../../../input/device/add-device'

export interface AddHemsDeviceRepository {
  add(device: AddDeviceModel, hemsId: string): Promise<void>
}
