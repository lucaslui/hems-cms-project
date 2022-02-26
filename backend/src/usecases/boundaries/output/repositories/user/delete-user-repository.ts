export interface DeleteUserRepository {
  delete (userId: string): Promise<void>
}
