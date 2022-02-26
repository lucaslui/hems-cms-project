import { IDeleteRoom } from '@/src/usecases/boundaries/input/room/delete-room'
import { noContent, notFound, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class DeleteRoomController implements IController {
  constructor (
    private readonly deleteRoom: IDeleteRoom
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { roomId } = httpRequest.params
      const isDeleted = await this.deleteRoom.delete(roomId, httpRequest.userId)
      if (!isDeleted) {
        return notFound()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
