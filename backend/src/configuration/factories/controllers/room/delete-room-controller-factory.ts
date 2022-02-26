import { DeleteRoomController } from '@/src/application/controllers/room/delete-room-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDeleteRoom } from '../../usecases/room/delete-room-factory'

export const makeDeleteRoomController = (): IController => {
  const deleteRoomController = new DeleteRoomController(makeDeleteRoom())
  return makeLogControllerDecorator(deleteRoomController)
}
