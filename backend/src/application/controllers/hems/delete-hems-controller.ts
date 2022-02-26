import { IDeleteHems } from '@/src/usecases/boundaries/input/hems/delete-hems'
import { noContent, notFound, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class DeleteHemsController implements IController {
  constructor (
    private readonly deleteHems: IDeleteHems
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { hemsId } = httpRequest.params
      const isDeleted = await this.deleteHems.delete(hemsId)
      if (!isDeleted) {
        return notFound()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
