import { RoomMongoRepository } from '@/src/infrastructure/repositories/mongodb/room-mongo-repository'
import { ILoadRooms } from '@/src/usecases/boundaries/input/room/load-rooms'
import { DbLoadRooms } from '@/src/usecases/interactors/room/load-rooms'

export const makeLoadRooms = (): ILoadRooms => {
  const roomMongoRepository = new RoomMongoRepository()
  return new DbLoadRooms(roomMongoRepository)
}
