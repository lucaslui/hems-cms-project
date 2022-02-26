import { DeviceModel } from '@/src/entities/device'
import { ILoadDevicesByData } from '../../boundaries/input/device/load-devices-by-data'
import { LoadUserByIdRepository } from '../../boundaries/output/repositories/auth/load-user-by-id-repository'
import { LoadHemsAllDevicesRepository } from '../../boundaries/output/repositories/device/load-devices-by-data-repository'

export class LoadDeviceByData implements ILoadDevicesByData {
  constructor (
    private readonly loadDevicesByDataRepository: LoadHemsAllDevicesRepository,
    private readonly loadAccountByIdRepository: LoadUserByIdRepository
  ) {}

  async load (userId: string, page: number): Promise<DeviceModel[]> {
    const account = await this.loadAccountByIdRepository.loadById(userId)
    if (account?.hemsId) {
      const devices = await this.loadDevicesByDataRepository.loadByData(account?.hemsId, page)
      return devices
    }
    return []
  }
}
