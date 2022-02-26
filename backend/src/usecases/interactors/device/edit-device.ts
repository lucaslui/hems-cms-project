import { EditDeviceModel, IEditDevice } from '@/src/usecases/boundaries/input/device/edit-device'
import { LoadUserByIdRepository } from '../../boundaries/output/repositories/auth/load-user-by-id-repository'
import { EditDeviceRepository } from '../../boundaries/output/repositories/device/edit-device-repository'
import { LoadDeviceByIdRepository } from '../../boundaries/output/repositories/device/load-device-by-id-repository'

export class EditDevice implements IEditDevice {
  constructor (
    private readonly editDeviceNicknameRepository: EditDeviceRepository,
    private readonly loadAccountByIdRepository: LoadUserByIdRepository,
    private readonly loadDeviceByIdRepository: LoadDeviceByIdRepository
  ) {}

  async editDevice (device: EditDeviceModel, userId: string): Promise<boolean> {
    const account = await this.loadAccountByIdRepository.loadById(userId)
    if (account?.hemsId) {
      const deviceLoaded = await this.loadDeviceByIdRepository.loadById(account.hemsId, device.id)
      if (deviceLoaded) {
        await this.editDeviceNicknameRepository.edit(device, account.hemsId)
        return true
      }
    }
    return false
  }
}
