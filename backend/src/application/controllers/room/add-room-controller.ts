import { IAddRoom } from '@/src/usecases/boundaries/input/room/add-room'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController, IValidation } from '../../protocols'

export class AddRoomController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly addRoom: IAddRoom
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { roomName, roomType } = httpRequest.body
      const region = await this.addRoom.add({ name: roomName, type: roomType, userId: httpRequest.userId })
      return ok(region)
    } catch (error) {
      return serverError(error)
    }
  }
}
