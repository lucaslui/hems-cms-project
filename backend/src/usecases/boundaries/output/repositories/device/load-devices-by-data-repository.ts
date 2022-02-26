import { DeviceModel } from '@/src/entities/device'

export interface LoadHemsAllDevicesRepository {
  loadByData(hemsId: string, page: number): Promise<DeviceModel[]>
}
