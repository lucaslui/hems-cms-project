import { HttpClient, HttpStatusCode } from '@/usecases/boundaries/output/http/http-client'
import { AccountModel } from '@/entities/account'
import { EmailInUseError } from '@/application/errors/email-in-use-error'
import { UnexpectedError } from '@/application/errors/unexpected-error'
import { AddAccount, AddAccountParams } from '@/usecases/boundaries/input/auth/add-account'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<AccountModel>
  ) {}

  async add (params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new EmailInUseError()
      default: throw new UnexpectedError()
    }
  }
}
