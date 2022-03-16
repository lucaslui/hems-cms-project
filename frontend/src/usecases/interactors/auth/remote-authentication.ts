import { HttpClient, HttpStatusCode } from '@/usecases/boundaries/output/http/http-client'
import { AccountModel } from '@/entities/account'
import { InvalidCredentialsError } from '@/application/errors/invalid-credentials-error'
import { UnexpectedError } from '@/application/errors/unexpected-error'
import { Authentication, AuthenticationParams } from '@/usecases/boundaries/input/auth/authentication'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
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
