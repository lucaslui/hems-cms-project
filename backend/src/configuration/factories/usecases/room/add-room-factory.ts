import { IAddRoom } from '@/src/usecases/boundaries/input/room/add-room'
import { DbAddRoom } from '@/src/usecases/interactors/room/add-room'
import { RoomMongoRepository } from '@/src/infrastructure/repositories/mongodb/room-mongo-repository'

export const makeAddRoom = (): IAddRoom => {
  const roomMongoRepository = new RoomMongoRepository()
  return new DbAddRoom(roomMongoRepository)
}
