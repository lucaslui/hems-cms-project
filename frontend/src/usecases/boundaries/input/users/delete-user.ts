export type DeleteUserParams = {
    userId: string
  }
  
  export interface IDeleteUser {
    delete: (params: DeleteUserParams) => Promise<void>
  }