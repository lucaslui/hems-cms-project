import { EditRoomController } from '@/src/application/controllers/room/edit-room-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeEditRoom } from '../../usecases/room/edit-room-factory'
import { makeEditRoomValidation } from '../../validations/room/edit-room-validation-factory'

export const makeEditRoomController = (): IController => {
  const editRoomController = new EditRoomController(makeEditRoomValidation(),makeEditRoom())
  return makeLogControllerDecorator(editRoomController)
}
