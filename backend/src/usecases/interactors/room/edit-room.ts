import { AddRoomModel } from '../../boundaries/input/room/add-room'
import { IEditRoom } from '../../boundaries/input/room/edit-room'
import { EditRoomRepository } from '../../boundaries/output/repositories/room/edit-room-repository'
import { LoadRoomByIdRepository } from '../../boundaries/output/repositories/room/load-room-by-id-repository'

export class DbEditRoom implements IEditRoom {
  constructor (
    private readonly editRoomRepository: EditRoomRepository,
    private readonly loadRoomByIdRepository: LoadRoomByIdRepository
  ) {}

  async edit (roomId: string, room: AddRoomModel, userId: string): Promise<boolean> {
    const roomAlreadyExist = await this.loadRoomByIdRepository.loadById(roomId, userId)
    if (roomAlreadyExist) {
      await this.editRoomRepository.edit(roomId, room)
      return true
    }
    return false
  }
}
