import { RemoteAuthentication } from '@/application/usecases/auth/remote-authentication'
import { Authentication } from '@/application/boundaries/input/auth/authentication'
import { makeApiUrl } from '../../http/api-url-factory'
import { makeAxiosAdapter } from '../../http/axios-adapter-factory'

export const makeRemoteAuthentication = (): Authentication =>
  new RemoteAuthentication(makeApiUrl('/login'), makeAxiosAdapter())
