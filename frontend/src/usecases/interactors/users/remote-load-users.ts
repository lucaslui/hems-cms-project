import { HttpClient, HttpStatusCode } from '@/usecases/boundaries/output/http/http-client'
import { UnexpectedError } from '@/application/errors/unexpected-error'
import { UserModel } from '@/entities/user'
import { ILoadUsers, LoadUsersParams } from '@/usecases/boundaries/input/users/load-users'
import { AccessDeniedError } from '@/application/errors/access-denied-error'

export class RemoteLoadUsers implements ILoadUsers {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<UserModel[]>
  ) {}

  async load (params: LoadUsersParams): Promise<UserModel[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url + `/users`,
      method: 'get',
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
