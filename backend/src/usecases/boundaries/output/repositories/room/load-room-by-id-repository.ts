import { RoomModel } from '@/src/entities/room'

export interface LoadRoomByIdRepository {
  loadById (roomId: string, userId: string): Promise<RoomModel>
}
