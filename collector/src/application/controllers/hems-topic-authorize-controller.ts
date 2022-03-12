import { serverError, ok } from '../helpers/http-helper'
import { IHttpRequest, IController, IHttpResponse } from '../protocols'
import { IHemsTopicAuthorizeUsecase } from '@/src/usecases/boundaries/input/hems-topic-authorize'
import { unauthorized } from '../helpers/http-helper'

export class HemsTopicAuthorizeController implements IController {
  constructor (
    private readonly hemsTopicAuthorize: IHemsTopicAuthorizeUsecase
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
        const { client_id, topic } = httpRequest.body
        console.log(`Pedido de publicação do "${client_id}" no tópico "${topic}"`)
        const authenticated = await this.hemsTopicAuthorize.auth({
          hemsId: client_id, 
          topic
        })
        if (!authenticated) {
          return unauthorized()
        }
        return ok(authenticated)
      } catch (error) {
        return serverError(error)
      }
  }
}
