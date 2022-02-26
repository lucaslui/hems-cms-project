import { IEditRoom } from '@/src/usecases/boundaries/input/room/edit-room'
import { DbEditRoom } from '@/src/usecases/interactors/room/edit-room'
import { RoomMongoRepository } from '@/src/infrastructure/repositories/mongodb/room-mongo-repository'

export const makeEditRoom = (): IEditRoom => {
  const roomMongoRepository = new RoomMongoRepository()
  return new DbEditRoom(roomMongoRepository, roomMongoRepository)
}
