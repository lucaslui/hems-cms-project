import { DeviceModel } from '@/src/entities/device'
import { ILoadDevices } from '@/src/usecases/boundaries/input/device/load-devices'
import { LoadUserByIdRepository } from '../../boundaries/output/repositories/auth/load-user-by-id-repository'
import { LoadHemsDevicesRepository } from '../../boundaries/output/repositories/device/load-devices-repository'

export class LoadDevices implements ILoadDevices {
  constructor (
    private readonly loadDevicesRepository: LoadHemsDevicesRepository,
    private readonly loadAccountByIdRepository: LoadUserByIdRepository
  ) {}

  async load (userId: string, page: number): Promise<DeviceModel[]> {
    const account = await this.loadAccountByIdRepository.loadById(userId)
    if (account?.hemsId) {
      const devices = await this.loadDevicesRepository.load(account.hemsId, page)
      return devices
    }
    return []
  }
}
