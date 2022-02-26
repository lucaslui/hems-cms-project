import { LoadRoomsController } from '@/src/application/controllers/room/load-rooms-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeLoadRooms } from '../../usecases/room/load-rooms-factory'

export const makeLoadRoomsController = (): IController => {
  const loadRoomsController = new LoadRoomsController(makeLoadRooms())
  return makeLogControllerDecorator(loadRoomsController)
}
