import { RemoteAuthentication } from '@/usecases/interactors/auth/remote-authentication'
import { Authentication } from '@/usecases/boundaries/input/auth/authentication'
import { makeApiUrl } from '../../http/api-url-factory'
import { makeAxiosAdapter } from '../../http/axios-adapter-factory'

export const makeRemoteAuthentication = (): Authentication =>
  new RemoteAuthentication(makeApiUrl('/login'), makeAxiosAdapter())
