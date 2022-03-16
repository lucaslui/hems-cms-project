import Role from '../application/presentation/enums/role-type'

export type AccountModel = {
  name: string
  email: string
  accessToken: string
  role: Role
}
