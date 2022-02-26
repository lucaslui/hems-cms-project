import { DeviceModel } from '@/src/entities/device'
import { ILoadDevicesByDataAdmin } from '../../boundaries/input/device/load-devices-by-data-admin'
import { LoadHemsAllDevicesRepository } from '../../boundaries/output/repositories/device/load-devices-by-data-repository'

export class LoadDeviceByDataAdmin implements ILoadDevicesByDataAdmin {
  constructor (
    private readonly loadHemsAllDevicesRepository: LoadHemsAllDevicesRepository
  ) {}

  async load (hemsId: string, page: number): Promise<DeviceModel[]> {
    const devices = await this.loadHemsAllDevicesRepository.loadByData(hemsId, page)
    if (devices) { return devices }
    return []
  }
}
