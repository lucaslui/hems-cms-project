import { AddDeviceModel, IAddDevice } from '@/src/usecases/boundaries/input/device/add-device'
import { LoadUserByIdRepository } from '../../boundaries/output/repositories/auth/load-user-by-id-repository'
import { AddHemsDeviceRepository } from '../../boundaries/output/repositories/device/add-device-repository'
import { LoadDeviceByIdRepository } from '../../boundaries/output/repositories/device/load-device-by-id-repository'

export class AddDevice implements IAddDevice {
  constructor (
    private readonly addHemsDeviceRepository: AddHemsDeviceRepository,
    private readonly loadAccountByIdRepository: LoadUserByIdRepository,
    private readonly loadDeviceByIdRepository: LoadDeviceByIdRepository
  ) {}

  async add (device: AddDeviceModel, userId: string): Promise<boolean> {
    const account = await this.loadAccountByIdRepository.loadById(userId)
    if (account?.hemsId) {
      const deviceLoaded = await this.loadDeviceByIdRepository.loadById(account.hemsId, device.id)
      if (!deviceLoaded) {
        await this.addHemsDeviceRepository.add(device, account.hemsId)
        return true
      }
    }
    return false
  }
}
