import { AddRoomModel, IAddRoom } from '../../boundaries/input/room/add-room'
import { RoomModel } from '@/src/entities/room'
import { AddRoomRepository } from '../../boundaries/output/repositories/room/add-room-repository'

export class DbAddRoom implements IAddRoom {
  constructor (
    private readonly addRoomRepository: AddRoomRepository
  ) { }

  async add (room: AddRoomModel): Promise<RoomModel> {
    const roomAdded = await this.addRoomRepository.add(room)
    return roomAdded
  }
}
