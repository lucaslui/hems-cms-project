import { RoomModel } from '@/src/entities/room'

export type AddRoomModel = {
  name: string
  type: string
  userId?: string
}

export interface IAddRoom {
  add (region: AddRoomModel): Promise<RoomModel>
}
