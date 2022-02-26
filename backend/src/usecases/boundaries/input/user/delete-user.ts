export interface IDeleteUser {
  delete (userId: string): Promise<boolean>
}
