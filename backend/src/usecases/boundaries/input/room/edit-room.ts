import { AddRoomModel } from './add-room'

export interface IEditRoom {
  edit (roomId: string, room: AddRoomModel, userId: string): Promise<boolean>
}
