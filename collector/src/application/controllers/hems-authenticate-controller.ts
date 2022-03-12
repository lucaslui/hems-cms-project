import { IHemsAuthenticateUsecase } from '@/src/usecases/boundaries/input/hems-authenticate'
import { ok, serverError, unauthorized } from '../helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../protocols'

export class HemsAuthenticateController implements IController {
  constructor (
    private readonly hemsAuthenticate: IHemsAuthenticateUsecase
  ) { }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { peer_addr, peer_port, client_id, username, password } = httpRequest.body
      console.log(`Pedido de conexão do "${client_id}" através do endereço "${peer_addr}:${peer_port}"`)
      const authorized = await this.hemsAuthenticate.auth({
        hemsId: client_id, 
        username,
        password,
      })
      if (!authorized) {
        return unauthorized()
      }
      return ok(authorized)
    } catch (error) {
      return serverError(error)
    }
  }
}
