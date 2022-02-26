import { DeviceModel } from '@/src/entities/device'

export interface LoadHemsDevicesRepository {
  load(hemsId: string, page: number): Promise<DeviceModel[]>
}
