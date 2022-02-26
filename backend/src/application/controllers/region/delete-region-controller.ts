import { IDeleteRegion } from '@/src/usecases/boundaries/input/region/delete-region'
import { noContent, notFound, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class DeleteRegionController implements IController {
  constructor (
    private readonly deleteRegion: IDeleteRegion
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { regionId } = httpRequest.params
      const isDeleted = await this.deleteRegion.delete(regionId)
      if (!isDeleted) {
        return notFound()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
