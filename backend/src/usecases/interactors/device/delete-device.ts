import { IDeleteDevice } from '@/src/usecases/boundaries/input/device/delete-device'
import { LoadUserByIdRepository } from '../../boundaries/output/repositories/auth/load-user-by-id-repository'
import { DeleteHemsDeviceRepository } from '../../boundaries/output/repositories/device/delete-device-repository'
import { LoadDeviceByIdRepository } from '../../boundaries/output/repositories/device/load-device-by-id-repository'

export class DeleteDevice implements IDeleteDevice {
  constructor (
    private readonly deleteHemsDeviceRepository: DeleteHemsDeviceRepository,
    private readonly loadAccountByIdRepository: LoadUserByIdRepository,
    private readonly loadHemsDeviceByIdRepository: LoadDeviceByIdRepository
  ) {}

  async delete (userId: string, deviceId: string): Promise<boolean> {
    const account = await this.loadAccountByIdRepository.loadById(userId)
    if (account?.hemsId) {
      const deviceLoaded = await this.loadHemsDeviceByIdRepository.loadById(account.hemsId, deviceId)
      if (deviceLoaded) {
        await this.deleteHemsDeviceRepository.delete(account.hemsId, deviceId)
        return true
      }
    }
    return false
  }
}
