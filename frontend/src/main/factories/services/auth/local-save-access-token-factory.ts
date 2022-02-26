import { LocalSaveAccessToken } from '@/application/usecases/auth/local-save-access-token'
import { SaveAccessToken } from '@/application/boundaries/input/auth/save-access-token'
import { makeLocalStorageAdapter } from '../../cache/local-storage-adapter-factory'

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
