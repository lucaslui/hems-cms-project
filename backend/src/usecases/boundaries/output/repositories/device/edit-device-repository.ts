import { EditDeviceModel } from '../../../input/device/edit-device'

export interface EditDeviceRepository {
  edit(device: EditDeviceModel, hemsId: string): Promise<void>
}
