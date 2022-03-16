import { LocalStorageAdapter } from '@/infrastructure/cache/local-storage-adapter'

export const makeLocalStorageAdapter = (): LocalStorageAdapter => {
  return new LocalStorageAdapter()
}
