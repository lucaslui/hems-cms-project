export interface DeleteRoomRepository {
  delete (roomId: string, userId: string): Promise<void>
}
