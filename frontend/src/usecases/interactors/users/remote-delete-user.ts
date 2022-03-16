import { HttpClient, HttpStatusCode } from '@/usecases/boundaries/output/http/http-client'
import { UnexpectedError } from '@/application/errors/unexpected-error'
import { UserModel } from '@/entities/user'
import { DeleteUserParams, IDeleteUser } from '@/usecases/boundaries/input/users/delete-user'
import { AccessDeniedError } from '@/application/errors/access-denied-error'

export class RemoteDeleteUser implements IDeleteUser {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<UserModel>
  ) {}

  async delete (params: DeleteUserParams): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: this.url + `/users/${params.userId}`,
      method: 'delete',
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.noContent: return
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
