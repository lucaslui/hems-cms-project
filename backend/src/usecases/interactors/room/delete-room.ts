import { IDeleteRoom } from '../../boundaries/input/room/delete-room'
import { DeleteRoomRepository } from '../../boundaries/output/repositories/room/delete-room-repository'
import { LoadRoomByIdRepository } from '../../boundaries/output/repositories/room/load-room-by-id-repository'

export class DbDeleteRoom implements IDeleteRoom {
  constructor (
    private readonly DeleteRoomRepository: DeleteRoomRepository,
    private readonly loadRoomByIdRepository: LoadRoomByIdRepository
  ) { }

  async delete (roomId: string, userId: string): Promise<boolean> {
    const room = await this.loadRoomByIdRepository.loadById(roomId, userId)
    if (room) {
      await this.DeleteRoomRepository.delete(roomId, userId)
      return true
    }
    return false
  }
}
