export interface IDeleteRoom {
  delete (roomId: string, userId: string): Promise<boolean>
}
