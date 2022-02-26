import { RemoteAddAccount } from '@/application/usecases/auth/remote-add-account'
import { AddAccount } from '@/application/boundaries/input/auth/add-account'
import { makeApiUrl } from '../../http/api-url-factory'
import { makeAxiosAdapter } from '../../http/axios-adapter-factory'

export const makeRemoteAddAccount = (): AddAccount =>
  new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosAdapter())
