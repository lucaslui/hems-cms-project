import { SetStorage } from '@/application/boundaries/output/cache/set-storage'
import { SaveAccessToken } from '@/application/boundaries/input/auth/save-access-token'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor (
    private readonly setStorage: SetStorage
  ) {}

  async save (accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', { accessToken })
  }
}
