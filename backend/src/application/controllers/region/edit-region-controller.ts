import { IEditRegion } from '@/src/usecases/boundaries/input/region/edit-region'
import { badRequest, noContent, notFound, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController, IValidation } from '../../protocols'

export class EditRegionController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly editRegion: IEditRegion
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { regionId } = httpRequest.params
      const { name, description } = httpRequest.body
      const isEdited = await this.editRegion.edit(regionId, { name, description })
      if (!isEdited) {
        return notFound()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
