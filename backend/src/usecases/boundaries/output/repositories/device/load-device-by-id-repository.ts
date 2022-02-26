import { DeviceModel } from '@/src/entities/device'

export interface LoadDeviceByIdRepository {
  loadById(hemsId: string, deviceId: string): Promise<DeviceModel>
}
