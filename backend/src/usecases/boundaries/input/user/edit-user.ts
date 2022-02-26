
export type EditUserModel = {
  id: string
  hemsId: string
  role: string
}

export interface IEditUser {
  edit (user: EditUserModel): Promise<boolean>
}
