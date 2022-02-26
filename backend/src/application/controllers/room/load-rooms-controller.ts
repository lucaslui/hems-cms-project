import { ILoadRooms } from '@/src/usecases/boundaries/input/room/load-rooms'
import { ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class LoadRoomsController implements IController {
  constructor (
    private readonly loadRooms: ILoadRooms
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { page } = httpRequest.query
      const rooms = await this.loadRooms.load({ userId: httpRequest.userId, page })
      return ok(rooms)
    } catch (error) {
      return serverError(error)
    }
  }
}
