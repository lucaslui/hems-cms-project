import { RoomModel } from '@/src/entities/room'
import { LoadRoomsQueryModel } from '../../../input/room/load-rooms'

export interface LoadRoomsRepository {
  load (query: LoadRoomsQueryModel): Promise<RoomModel[]>
}
