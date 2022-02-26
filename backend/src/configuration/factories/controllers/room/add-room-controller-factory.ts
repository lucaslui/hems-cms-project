import { AddRoomController } from '@/src/application/controllers/room/add-room-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeAddRoom } from '../../usecases/room/add-room-factory'
import { makeAddRoomValidation } from '../../validations/room/add-room-validation-factory'

export const makeAddRoomController = (): IController => {
  const addRoomController = new AddRoomController(makeAddRoomValidation(),makeAddRoom())
  return makeLogControllerDecorator(addRoomController)
}
