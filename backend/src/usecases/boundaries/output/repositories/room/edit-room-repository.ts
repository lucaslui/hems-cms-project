import { AddRoomModel } from '../../../input/room/add-room'

export interface EditRoomRepository {
  edit (roomId: string, room: AddRoomModel): Promise<void>
}
