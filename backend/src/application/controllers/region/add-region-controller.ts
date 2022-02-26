import { IAddRegion } from '@/src/usecases/boundaries/input/region/add-region'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController, IValidation } from '../../protocols'

export class AddRegionController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly addRegion: IAddRegion
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, description } = httpRequest.body
      const region = await this.addRegion.add({ name, description })
      return ok(region)
    } catch (error) {
      return serverError(error)
    }
  }
}
