import { ILoadRooms, LoadRoomsQueryModel } from '../../boundaries/input/room/load-rooms'
import { LoadRoomsRepository } from '../../boundaries/output/repositories/room/load-rooms-repository'
import { RoomModel } from '@/src/entities/room'

export class DbLoadRooms implements ILoadRooms {
  constructor (
    private readonly loadRoomsRepository: LoadRoomsRepository
  ) {}

  async load (query: LoadRoomsQueryModel): Promise<RoomModel[]> {
    const rooms = await this.loadRoomsRepository.load(query)
    return rooms
  }
}
