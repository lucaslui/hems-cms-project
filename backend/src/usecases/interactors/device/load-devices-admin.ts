import { DeviceModel } from '@/src/entities/device'
import { LoadHemsDevicesRepository } from '../../boundaries/output/repositories/device/load-devices-repository'
import { ILoadDevicesAdmin } from '../../boundaries/input/device/load-devices-admin'

export class LoadDevicesAdmin implements ILoadDevicesAdmin {
  constructor (
    private readonly loadHemsDevicesRepository: LoadHemsDevicesRepository
  ) {}

  async loadDevicesAdmin (hemsId: string, page: number): Promise<DeviceModel[]> {
    const devices = await this.loadHemsDevicesRepository.load(hemsId, page)
    if (devices) { return devices }
    return []
  }
}
