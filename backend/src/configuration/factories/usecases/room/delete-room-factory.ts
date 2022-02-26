import { RoomMongoRepository } from '@/src/infrastructure/repositories/mongodb/room-mongo-repository'
import { IDeleteRoom } from '@/src/usecases/boundaries/input/room/delete-room'
import { DbDeleteRoom } from '@/src/usecases/interactors/room/delete-room'

export const makeDeleteRoom = (): IDeleteRoom => {
  const roomMongoRepository = new RoomMongoRepository()
  return new DbDeleteRoom(roomMongoRepository, roomMongoRepository)
}
