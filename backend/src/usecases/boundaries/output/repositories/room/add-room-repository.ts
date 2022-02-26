import { RoomModel } from '@/src/entities/room'
import { AddRoomModel } from '../../../input/room/add-room'

export interface AddRoomRepository {
  add (room: AddRoomModel): Promise<RoomModel>
}
