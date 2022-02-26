import { IAddHems } from '@/src/usecases/boundaries/input/hems/add-hems'
import { HemsAlreadyRegisteredError } from '../../errors/hems-already-registered-error'
import { badRequest, forbidden, noContent, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController, IValidation } from '../../protocols'

export class AddHemsController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly addHems: IAddHems
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { hemsId, regionId, mqttUsername, mqttPassword } = httpRequest.body
      const hems = await this.addHems.add({ id: hemsId, regionId, mqttUsername, mqttPassword })
      if (!hems) {
        return forbidden(new HemsAlreadyRegisteredError())
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
