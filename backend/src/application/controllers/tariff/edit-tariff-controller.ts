import { IEditTariff } from '@/src/usecases/boundaries/input/tariff/edit-tariff'
import { badRequest, noContent, notFound, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController, IValidation } from '../../protocols'

export class EditTariffController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly editTariff: IEditTariff
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { tariffTusd, tariffTe, tariffFlag } = httpRequest.body
      const isEdited = await this.editTariff.edit({ tariffTusd, tariffTe, tariffFlag })
      if (!isEdited) {
        return notFound()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
