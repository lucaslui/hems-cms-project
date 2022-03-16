import { HttpClient, HttpStatusCode } from '@/usecases/boundaries/output/http/http-client'
import { InvalidCredentialsError } from '@/application/errors/invalid-credentials-error'
import { UnexpectedError } from '@/application/errors/unexpected-error'
import { IAddUser, AddUserParams } from '@/usecases/boundaries/input/users/add-user'
import { UserModel } from '@/entities/user'

export class RemoteAddUser implements IAddUser {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<UserModel>
  ) {}

  async add (params: AddUserParams): Promise<UserModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url + `/users`,
      method: 'post',
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
