import { IHemsSaveDataUsecase } from '@/src/usecases/boundaries/input/hems-save-data'
import { ok, serverError } from '../helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../protocols'

export class HemsSaveDataController implements IController {
  constructor (
    private readonly hemsSaveData: IHemsSaveDataUsecase
  ) { }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { client_id, topic, payload } = httpRequest.body
      const result = await this.hemsSaveData.save({
        hemsId: client_id, 
        topic, 
        payload
      })
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

            

