export type AddUserModel = {
  name: string
  email: string
  password: string
  role: string
}

export interface IAddUser {
  add (user: AddUserModel): Promise<boolean>
}
