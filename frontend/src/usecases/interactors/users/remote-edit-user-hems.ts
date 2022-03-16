import { HttpClient, HttpStatusCode } from '@/usecases/boundaries/output/http/http-client'
import { InvalidCredentialsError } from '@/application/errors/invalid-credentials-error'
import { UnexpectedError } from '@/application/errors/unexpected-error'
import { UserModel } from '@/entities/user'
import { EditUserHemsParams, IEditUserHems } from '@/usecases/boundaries/input/users/edit-user-hems'
import { MissingParamError } from '@/application/errors/missing-param-error'

export class RemoteEditUserHems implements IEditUserHems {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<UserModel>
  ) {}

  async edit (params: EditUserHemsParams): Promise<void> {
    const httpResponse = await this.httpClient.request({
        url: this.url + `/users/${params.userId}`,
        method: 'put',
        body: { 
            hemsId: params.hemsId,
            role: params.role 
        }      
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.noContent: return
      case HttpStatusCode.badRequest: throw new MissingParamError('hemsId or role')
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
