import { IEditRoom } from '@/src/usecases/boundaries/input/room/edit-room'
import { badRequest, noContent, notFound, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController, IValidation } from '../../protocols'

export class EditRoomController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly editRoom: IEditRoom
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { roomId } = httpRequest.params
      const { roomName, roomType } = httpRequest.body
      const isEdited = await this.editRoom.edit(roomId, { name: roomName, type: roomType }, httpRequest.userId)
      if (!isEdited) {
        return notFound()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
