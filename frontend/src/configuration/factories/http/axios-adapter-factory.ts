import { AxiosAdapter } from '@/infrastructure/http/axios-adapter'

export const makeAxiosAdapter = (): AxiosAdapter => {
  return new AxiosAdapter()
}
