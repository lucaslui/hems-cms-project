import { RoomModel } from '@/src/entities/room'

export type LoadRoomsQueryModel = {
  userId: string
  page?: number
}

export interface ILoadRooms {
  load (query: LoadRoomsQueryModel): Promise<RoomModel[]>
}
