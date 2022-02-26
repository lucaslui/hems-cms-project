import Role from '../enums/role-type'

export type AccountModel = {
  name: string
  email: string
  accessToken: string
  role: Role
}
