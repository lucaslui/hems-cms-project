import { IEditHemsRegion } from '@/src/usecases/boundaries/input/hems/edit-hems-region'
import { badRequest, noContent, notFound, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController, IValidation } from '../../protocols'

export class EditHemsRegionController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly editHemsRegion: IEditHemsRegion
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { hemsId } = httpRequest.params
      const { regionId } = httpRequest.body
      const isEdited = await this.editHemsRegion.editRegion(hemsId, regionId)
      if (!isEdited) {
        return notFound()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
